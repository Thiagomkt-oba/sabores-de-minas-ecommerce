exports.handler = async (event, context) => {
  // Add CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  // Handle OPTIONS request (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse and validate request body
    let requestBody;
    try {
      requestBody = JSON.parse(event.body || '{}');
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      };
    }

    const {
      nome,
      cpf,
      email,
      telefone,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      complemento,
      items,
      amount
    } = requestBody;

    // Validate required fields
    if (!nome || !cpf || !email || !telefone || !amount) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Campos obrigatórios: nome, cpf, email, telefone, amount"
        })
      };
    }

    // Clean CPF and phone
    const cleanCpf = cpf.replace(/[.-]/g, '');
    const cleanPhone = telefone.replace(/\D/g, '');

    // Check if we have For4Payments API credentials configured
    if (!process.env.FOR4PAYMENTS_API_KEY) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "API de pagamento não configurada",
          message: "Configure a variável FOR4PAYMENTS_API_KEY nas environment variables do Netlify"
        })
      };
    }

    // Prepare For4Payments API request
    const paymentData = {
      name: nome,
      email: email,
      cpf: cleanCpf,
      phone: cleanPhone,
      paymentMethod: "PIX",
      amount: Math.round(amount * 100),
      traceable: true,
      items: items || [{
        unitPrice: Math.round(amount * 100),
        title: "Produto",
        quantity: 1,
        tangible: false
      }],
      cep: cep || null,
      street: logradouro || null,
      number: numero || null,
      district: bairro || null,
      city: cidade || null,
      state: estado || null,
      complement: complemento || null,
      externalId: `order_${Date.now()}`,
      postbackUrl: null
    };

    console.log("Sending request to For4Payments with data:", JSON.stringify(paymentData, null, 2));

    const response = await fetch("https://app.for4payments.com.br/api/v1/transaction.purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.FOR4PAYMENTS_API_KEY
      },
      body: JSON.stringify(paymentData)
    });

    console.log("For4Payments response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("For4Payments API Error:", response.status, errorData);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          error: "Erro ao processar pagamento com For4Payments",
          status: response.status,
          details: errorData
        })
      };
    }

    const pixData = await response.json();
    console.log("For4Payments response data:", JSON.stringify(pixData, null, 2));

    // Prepare Utmify order data
    const urlParams = new URLSearchParams(event.rawQuery || '');
    const utmifyOrderData = {
      orderId: pixData.id,
      platform: "SaboresDeMinas",
      paymentMethod: "pix",
      status: "waiting_payment",
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      approvedDate: null,
      refundedAt: null,
      customer: {
        name: nome,
        email: email,
        phone: cleanPhone,
        document: cleanCpf,
        country: "BR",
        ip: event.headers['client-ip'] || null
      },
      products: [
        {
          id: "conjunto-3-manteigas",
          name: "Conjunto 3 Manteigas Sabores de Minas",
          planId: null,
          planName: null,
          quantity: 1,
          priceInCents: Math.round(amount * 100)
        }
      ],
      trackingParameters: {
        src: urlParams.get('src') || null,
        sck: urlParams.get('sck') || null,
        utm_source: urlParams.get('utm_source') || null,
        utm_campaign: urlParams.get('utm_campaign') || null,
        utm_medium: urlParams.get('utm_medium') || null,
        utm_content: urlParams.get('utm_content') || null,
        utm_term: urlParams.get('utm_term') || null
      },
      commission: {
        totalPriceInCents: Math.round(amount * 100),
        gatewayFeeInCents: Math.round(amount * 100 * 0.05),
        userCommissionInCents: Math.round(amount * 100 * 0.95)
      },
      isTest: false
    };

    // Send to Utmify
    try {
      const utmifyResponse = await fetch("https://api.utmify.com.br/api-credentials/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-token": process.env.UTMIFY_API_TOKEN || ""
        },
        body: JSON.stringify(utmifyOrderData)
      });

      if (!utmifyResponse.ok) {
        console.error("Utmify API Error:", await utmifyResponse.text());
      } else {
        console.log("Sale data sent to Utmify successfully");
      }
    } catch (error) {
      console.error("Error sending to Utmify:", error);
    }

    // Return PIX data
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({
        transactionId: pixData.id,
        pixQrCode: pixData.pixQrCode,
        pixCode: pixData.pixCode,
        amount: amount,
        expiresAt: pixData.expiresAt,
        status: pixData.status
      })
    };

  } catch (error) {
    console.error("Error creating PIX payment:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Erro interno do servidor"
      })
    };
  }
};