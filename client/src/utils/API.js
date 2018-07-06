import axios from 'axios'

export default {

    getGoals: () => {
        return axios.get('/api/goals');
    },

    saveGoal: data => {
        return axios.post('/api/goals', data)
    },

    updateGoal: id => {
        return axios.put(`api/goals/${id}`)
    },

    deleteGoal: id => {
        return axios.delete(`/api/goals/:${id}`)
    }

}