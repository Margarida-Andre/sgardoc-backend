const Municipio = require("../models/Municipio");
const Provincia = require("../models/Provincia");

module.exports = {
  async getMunicipiosByProvincia(req, res) {
    try {
      const { provinciaId } = req.params;
      const municipiosProvincia = await Provincia.findByPk(provinciaId, {
        include: {
          association: "municipio",
        },
      });

      if (!municipiosProvincia) {
        return res.status(400).json({ message: "Essa província não existe" });
      }

      if (municipiosProvincia == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhum município nesta província" });
      }

      return res.json(municipiosProvincia);
    } catch (error) {
      res.json(error);
    }
  },

  async getMunicipios(req, res) {
    try {
      const municipios = await Municipio.findAll();
      if (municipios == 0) {
        return res.status(400).json({ message: "Não existe nenhum município" });
      }
      return res.json(municipios);
    } catch (error) {
      res.json(error);
    }
  },

  async createMunicipio(req, res) {
    const { provinciaId, designacao, criadoPor, actualizadoPor } = req.body;

    const provincia = await Provincia.findByPk(provinciaId);
    if (!provincia) {
      return res.status(400).json({ message: "Esta província não existe" });
    }

    if (designacao === " ") {
      return res
        .status(400)
        .json({ message: "Digite a designacao, por favor!" });
    }

    const municipioNome = await Municipio.findOne({ where: { designacao } });
    if (municipioNome != null) {
      return res.status(400).json({ message: "Este município já existe" });
    }

    const municipioCreate = await Municipio.create({
      provinciaId,
      designacao,
      criadoPor,
      actualizadoPor,
    });
    return res.json(municipioCreate);
  },

  async delete(req, res) {
    const { nome } = req.body;
    const municipioDelete = await Municipio.destroy({ where: { nome } });
    if (!municipioDelete) {
      return res.json({ message: "Este município não existe" });
    }
    return res.json({ message: "Excluído com sucesso" });
  },

  async update(req, res) {
    const { id, provinciaId, nome } = req.body;

    const municipioInexistente = await Municipio.findByPk(id);
    if (!municipioInexistente) {
      return res.status(400).json({ message: "Este município não existe" });
    }

    const municipioNome = await Municipio.findOne({ where: { nome } });
    if (municipioNome != null) {
      return res.status(400).json({ message: "Este município já existe" });
    }

    const municipioUpdate = await Municipio.update(
      { provinciaId, nome },
      { where: { id } }
    );
    return res.json({ message: "Actualizado com sucesso" });
  },
};
