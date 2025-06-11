exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const webhookData = JSON.parse(event.body);
    console.log("For4Payments webhook received:", webhookData);

    // Check if it's a PIX payment confirmation
    if (webhookData.status === "APPROVED" && webhookData.paymentMethod === "PIX") {
      // Prepare Utmify order data for PIX paid
      const utmifyOrderData = {
        orderId: webhookData.id,
        platform: "SaboresDeMinas",
        paymentMethod: "pix",
        status: "paid",
        createdAt: webhookData.createdAt || new Date().toISOString().slice(0, 19).replace('T', ' '),
        approvedDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
        refundedAt: null,
        customer: {
          name: webhookData.customer?.name || "Cliente",
          email: webhookData.customer?.email || "cliente@email.com",
          phone: webhookData.customer?.phone || null,
          document: webhookData.customer?.document || null,
          country: "BR",
          ip: null
        },
        products: [
          {
            id: "conjunto-3-manteigas",
            name: "Conjunto 3 Manteigas Sabores de Minas",
            planId: null,
            planName: null,
            quantity: 1,
            priceInCents: webhookData.amount || 6990
          }
        ],
        trackingParameters: {
          src: null,
          sck: null,
          utm_source: null,
          utm_campaign: null,
          utm_medium: null,
          utm_content: null,
          utm_term: null
        },
        commission: {
          totalPriceInCents: webhookData.amount || 6990,
          gatewayFeeInCents: Math.round((webhookData.amount || 6990) * 0.05),
          userCommissionInCents: Math.round((webhookData.amount || 6990) * 0.95)
        },
        isTest: false
      };

      // Send PIX paid event to Utmify
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
          console.log("Payment confirmation sent to Utmify successfully");
        }
      } catch (error) {
        console.error("Error sending to Utmify:", error);
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ received: true })
    };
  } catch (error) {
    console.error("Error processing webhook:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error processing webhook" })
    };
  }
};