import axios from 'axios'

export default {

    getItems: id => {
        console.log(id);
        return axios.get('/api/items', {params: {_id: id}})
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    saveItem: (id, data) => {
        return axios.post(`/api/items/${id}`, data)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    updateItem: (id, data)=> {
        return axios.put(`/api/items/${id}`, data)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });

    },

    deleteItem: id => {
        return axios.delete(`/api/items/${id}`)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

}