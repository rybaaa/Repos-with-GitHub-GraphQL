import axios from "axios";

export const repositoriesModule = {
    state: () => ({
        isAuth: false,
        token: localStorage.getItem('token'),
        isLoading: false,
        login: '',
        avatar: '',
        owner: '',
        repositories: [],
        totalRepositories: 0,
        count: 0,
        hasNextPage: false,
        endCursor: '',
        hasPreviousPage: false,
        startCursor: '',
    }),
    getters: {},
    mutations: {
        setIsAuth(state, value){
            state.isAuth = value
        },
        setToken(state, token){
            state.token = token
        },
        setRepositories(state, repos) {
            state.repositories = repos
        },
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading
        },
        setLogin(state, login) {
            state.login = login
        },
        setAvatar(state, url) {
            state.avatar = url
        },
        setTotalRepositories(state, totalCount) {
            state.totalRepositories = totalCount
        },
        setCount(state, count) {
            state.count = count
        },
        setHasNextPage(state, value) {
            state.hasNextPage = value
        },
        setEndCursor(state, value) {
            state.endCursor = value
        },
        setHasPreviousPage(state, value) {
            state.hasPreviousPage = value
        },
        setStartCursor(state, value) {
            state.startCursor = value
        },
    },
    actions: {
        async fetchRepos({commit, state}) {
            commit('setIsLoading', true)
            try {
                const response = await axios.post(
                    `https://api.github.com/graphql`,
                    {
                        "query": "{\n" +
                            "  repositoryOwner(login: \"octocat\") {\n" +
                            "    repositories(first: 100, orderBy: {field: NAME, direction: ASC}) {\n" +
                            "      totalCount\n" +
                            "      pageInfo {\n" +
                            "        hasNextPage\n" +
                            "        endCursor\n" +
                            "        hasPreviousPage\n" +
                            "        startCursor\n" +
                            "      }\n" +
                            "      nodes {\n" +
                            "        name\n" +
                            "owner {\n" +
                            "            login\n" +
                            "          }" +
                            "      }\n" +
                            "    }\n" +
                            "    avatarUrl\n" +
                            "    login\n" +
                            "  }\n" +
                            "}",
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'token ' + state.token,
                        },
                    }
                )
                commit('setLogin', response.data.data.repositoryOwner.login)
                commit('setAvatar', response.data.data.repositoryOwner.avatarUrl)
                commit('setRepositories', response.data.data.repositoryOwner.repositories.nodes)
                commit('setTotalRepositories', response.data.data.repositoryOwner.repositories.totalCount)
                commit('setCount', response.data.data.repositoryOwner.repositories.nodes.length)
                commit('setHasNextPage', response.data.data.repositoryOwner.repositories.pageInfo.hasNextPage)
                commit('setEndCursor', response.data.data.repositoryOwner.repositories.pageInfo.endCursor)
                commit('setHasPreviousPage', response.data.data.repositoryOwner.repositories.pageInfo.hasPreviousPage)
                commit('setStartCursor', response.data.data.repositoryOwner.repositories.pageInfo.startCursor)
            } catch (err) {
                commit('setIsAuth', false)
                alert(err.response.data.message)
            } finally {
                commit('setIsLoading', false)
            }
        },
        async loadNextRepos({commit,state}) {
            commit('setIsLoading', true)
            try {
                const response = await axios.post(
                    `https://api.github.com/graphql`,
                    {
                        "query": `{
  repositoryOwner(login: "octocat") {
    login
    avatarUrl
    repositories(
      first: 100
      orderBy: {field: NAME, direction: ASC}
      after: "${state.endCursor}"
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        name
        owner {
          login
        }
      }
    }
  }
}`,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'token ' + state.token,
                        },
                    }
                )
                commit('setLogin', response.data.data.repositoryOwner.login)
                commit('setAvatar', response.data.data.repositoryOwner.avatarUrl)
                commit('setRepositories', response.data.data.repositoryOwner.repositories.nodes)
                commit('setTotalRepositories', response.data.data.repositoryOwner.repositories.totalCount)
                commit('setCount', response.data.data.repositoryOwner.repositories.nodes.length)
                commit('setHasNextPage', response.data.data.repositoryOwner.repositories.pageInfo.hasNextPage)
                commit('setEndCursor', response.data.data.repositoryOwner.repositories.pageInfo.endCursor)
                commit('setHasPreviousPage', response.data.data.repositoryOwner.repositories.pageInfo.hasPreviousPage)
                commit('setStartCursor', response.data.data.repositoryOwner.repositories.pageInfo.startCursor)
            } catch (err) {
                alert(err.response.data.message)
            } finally {
                commit('setIsLoading', false)
            }
        },
        async loadPrevRepos({commit,state}) {
            commit('setIsLoading', true)
            try {
                const response = await axios.post(
                    `https://api.github.com/graphql`,
                    {
                        "query": `{
  repositoryOwner(login: "octocat") {
    login
    avatarUrl
    repositories(
      first: 100
      orderBy: {field: NAME, direction: ASC}
      before: "${state.startCursor}"
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        name
        owner {
          login
        }
      }
    }
  }
}`,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'token ' + state.token,
                        },
                    }
                )
                commit('setLogin', response.data.data.repositoryOwner.login)
                commit('setRepositories', response.data.data.repositoryOwner.repositories.nodes)
                commit('setTotalRepositories', response.data.data.repositoryOwner.repositories.totalCount)
                commit('setCount', response.data.data.repositoryOwner.repositories.nodes.length)
                commit('setHasNextPage', response.data.data.repositoryOwner.repositories.pageInfo.hasNextPage)
                commit('setEndCursor', response.data.data.repositoryOwner.repositories.pageInfo.endCursor)
                commit('setHasPreviousPage', response.data.data.repositoryOwner.repositories.pageInfo.hasPreviousPage)
                commit('setStartCursor', response.data.data.repositoryOwner.repositories.pageInfo.startCursor)
            } catch (err) {
                alert(err.response.data.message)
            } finally {
                commit('setIsLoading', false)
            }
        },
    },
    namespaced:true
}