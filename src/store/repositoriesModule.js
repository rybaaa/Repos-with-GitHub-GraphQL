import axios from "axios";
import query from "@/query/query";
import data from "@/query/data";

export const repositoriesModule = {
    state: ()=>({
        isLoading: false,
        login: '',
        repositories:[],
        totalRepositories: 0,
        count: 0,
        currentRepo:{},
        hasNextPage:false,
        endCursor: '',
        hasPreviousPage:false,
        startCursor: ''
    }),
    getters:{

    },
    mutations:{
        setRepositories(state, repos){
            state.repositories = repos
        },
        setIsLoading(state, isLoading){
            state.isLoading = isLoading
        },
        setLogin(state, login){
            state.login = login
        },
        setTotalRepositories(state, totalCount){
            state.totalRepositories = totalCount
        },
        setCount(state, count){
            state.count = count
        },
        setCurrentRepo(state, repo){
            state.currentRepo = repo
        },
        setHasNextPage(state, value){
            state.hasNextPage = value
        },
        setEndCursor(state, value){
            state.endCursor = value
        },
        setHasPreviousPage(state, value){
            state.hasPreviousPage = value
        },
        setStartCursor(state, value){
            state.startCursor = value
        },
    },
    actions:{
        async fetchRepos({commit}) {
            commit('setIsLoading', true)
            try{
                const response = await axios.post(
                    `https://api.github.com/graphql`,
                    {
                        query,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'token ' + data["token"],
                        },
                    }
                )
                console.log(response)
                commit('setLogin', response.data.data.repositoryOwner.login)
                commit('setRepositories', response.data.data.repositoryOwner.repositories.nodes)
                commit('setTotalRepositories', response.data.data.repositoryOwner.repositories.totalCount)
                commit('setCount', response.data.data.repositoryOwner.repositories.nodes.length)
                commit('setHasNextPage', response.data.data.repositoryOwner.repositories.pageInfo.hasNextPage)
                commit('setEndCursor', response.data.data.repositoryOwner.repositories.pageInfo.endCursor)
                commit('setHasPreviousPage', response.data.data.repositoryOwner.repositories.pageInfo.hasPreviousPage)
                commit('setStartCursor', response.data.data.repositoryOwner.repositories.pageInfo.startCursor)
            }
            catch(err) {
                alert(err.response.data.message)
            }
            finally {
                commit('setIsLoading', false)
            }
        }
    }
}