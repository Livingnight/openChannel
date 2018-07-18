import axios from 'axios'

export default {

    getGoals: email => {
        console.log(email);
        return axios.get('/api/goals', {params: {author: email}})
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    getGoal: id => {
        return axios.get(`/api/goals/${id}`)
            .then( response => {
                console.log(response);
                return response;
            })
    },

    saveGoal: data => {
        return axios.post('/api/goals', data)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    updateGoal: (id, data)=> {
        return axios.put(`/api/goals/${id}`, data)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });

    },

    deleteGoal: id => {
        return axios.delete(`/api/goals/${id}`)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

}