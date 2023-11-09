const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const dotenv = require("dotenv/config.js");
const Usuario = require("../models/Usuario");

module.exports = {
  async sessaoUsuario(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.findOne({
        where: { email },
      });

      if (!usuario) {
        return res
          .status(400)
          .json({ message: "Não existe nenhum usuário com este email" });
      }

      const senhaUsuario = await compare(senha, usuario.senha);

      if (!senhaUsuario) {
        return res.status(400).json({ error: "Senha incorrecta" });
      }

      const token = sign(
        { id: usuario.id },
        process.env.SECRET_JWT
        // { expiresIn: 3600 }
      );

      return res.json({
        auth: true,
        token: token,
        usuario: usuario.nome,
      });
    } catch (error) {
      res.json(error);
    }
  },
};
