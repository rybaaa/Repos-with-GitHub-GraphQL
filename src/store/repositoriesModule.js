import axios from "axios";
import data from "@/query/data";

export const repositoriesModule = {
    state: () => ({
        isLoading: false,
        login: '',
        avatar: '',
        owner: '',
        repositories: [],
        totalRepositories: 0,
        count: 0,
        currentRepo: {},
        hasNextPage: false,
        endCursor: '',
        hasPreviousPage: false,
        startCursor: '',
        currentIssues: {},
        countIssues:0
    }),
    getters: {},
    mutations: {
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
        setCurrentRepo(state, repo) {
            state.currentRepo = repo
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
        setCurrentIssues(state, issues) {
            state.currentIssues = issues
        },
        setCountIssues(state, count){
            state.countIssues=count
        }
    },
    actions: {
        async fetchRepos({commit}) {
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
                            Authorization: 'token ' + data["token"],
                        },
                    }
                )
                console.log(response)
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
        async loadNextRepos({commit}) {
            console.log(this.state.repositories.endCursor)
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
      after: "${this.state.repositories.endCursor}"
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
                            Authorization: 'token ' + data["token"],
                        },
                    }
                )
                console.log(response)
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
        async loadPrevRepos({commit}) {
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
      before: "${this.state.repositories.startCursor}"
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
            } catch (err) {
                alert(err.response.data.message)
            } finally {
                commit('setIsLoading', false)
            }
        },
        async fetchRepo({commit}) {
            console.log(this.state.repositories.currentRepo.name)
            console.log(this.state.repositories.currentRepo.owner.login)
            commit('setIsLoading', true)
            try {
                const response = await axios.post(
                    `https://api.github.com/graphql`,
                    {
                        "query": `query MyQuery {
  repository(name: "${this.state.repositories.currentRepo.name}", owner: "${this.state.repositories.currentRepo.owner.login}") {
    issues(first: 100, orderBy: {field: CREATED_AT, direction: ASC}) {
      totalCount
      nodes {
        bodyText
        state
        title
        comments(first: 100, orderBy: {field: UPDATED_AT, direction: ASC}) {
          nodes {
            bodyText 
            createdAt
          }
        }
      }
    }
  }
}`,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'token ' + data["token"],
                        },
                    }
                )
                console.log(response)
                commit('setCurrentIssues', response.data.data.repository.issues)
                commit('setCountIssues', response.data.data.repository.issues.nodes.length)
            } catch (err) {
                alert(err.response.data.message)
            } finally {
                commit('setIsLoading', false)
            }
        }
    }
}