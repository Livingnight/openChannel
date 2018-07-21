import axios from "axios/index";

export default {
    getAllEmployeeItems: allEmployee => {
        console.log(allEmployee);
        return axios.get('/api/AllEmployeeItems')
            .then(function (response) {
                console.log('find all: ', response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    saveAllEmployeeItem: (id, data) => {
        return axios.post(`/api/AllEmployeeItems/${id}`, data)
            .then(function (response) {
                console.log('save: ', response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    updateAllEmployeeItem: id => {
        return axios.put(`/api/AllEmployeeItems/${id}`)
            .then(function (response) {
                console.log('update: ', response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });

    },

    deleteAllEmployeeItem: id => {
        return axios.delete(`/api/AllEmployeeItems/:${id}`)
            .then(function (response) {
                console.log('delete: ', response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

}