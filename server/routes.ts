import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // PIX Payment endpoint
  app.post("/api/create-pix-payment", async (req, res) => {
    try {
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
      } = req.body;

      // Validate required fields
      if (!nome || !cpf || !email || !telefone || !amount) {
        return res.status(400).json({
          error: "Campos obrigatórios: nome, cpf, email, telefone, amount"
        });
      }

      // Clean CPF (remove dots and dashes)
      const cleanCpf = cpf.replace(/[.-]/g, '');
      
      // Clean phone number (remove non-digits)
      const cleanPhone = telefone.replace(/\D/g, '');

      // Prepare payment data for For4Payments API
      const paymentData = {
        name: nome,
        email: email,
        cpf: cleanCpf,
        phone: cleanPhone,
        paymentMethod: "PIX",
        amount: Math.round(amount * 100), // Convert to cents
        traceable: true,
        items: items || [{
          unitPrice: Math.round(amount * 100),
          title: "Produto",
          quantity: 1,
          tangible: false
        }],
        // Address fields (optional for PIX)
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

      // Call For4Payments API
      const response = await fetch("https://app.for4payments.com.br/api/v1/transaction.purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": process.env.FOR4PAYMENTS_API_KEY || ""
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("For4Payments API Error:", errorData);
        return res.status(400).json({
          error: "Erro ao processar pagamento",
          details: errorData
        });
      }

      const pixData = await response.json();

      // Return PIX data to frontend
      res.json({
        transactionId: pixData.id,
        pixQrCode: pixData.pixQrCode,
        pixCode: pixData.pixCode,
        amount: amount,
        expiresAt: pixData.expiresAt,
        status: pixData.status
      });

    } catch (error) {
      console.error("Error creating PIX payment:", error);
      res.status(500).json({
        error: "Erro interno do servidor"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
