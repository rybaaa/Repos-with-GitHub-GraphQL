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
            }
            catch {
                alert('Error occurred')
            }
            finally {
                commit('setIsLoading', false)
            }
        }
    }
}