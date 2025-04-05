const {createList, editList} = require('../../services/api/listsServices')
module.exports = {
    getList: async (req, res) => {
        try {
        } catch (error) {
        }
    },
    postList: async (req, res) => {
        try {
            const { name, status,  userid} = req.body;

            
            try {

                user = await createList(name, status, userid);
                const response = {
                  status: 201,
                  user,
                };
          
                return res.status(response.status).json(response);
              } catch (error) {
                console.error(error);
                const status = error.status || 500;
                const message = error.message || "Hubo un error en la petición POST";
                return res.status(status).json({
                  ok: false,
                  error: {
                    status,
                    message,
                  },
                });
              }
        } catch (error) {
        }
    },
    PutList: async (req, res) => {
        try {
            editList()
        } catch (error) {
        }
    },
    deleteList: async (req, res) => {
        try {
        } catch (error) {
        }
    }
};
