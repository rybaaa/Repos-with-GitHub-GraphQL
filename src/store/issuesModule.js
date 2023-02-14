import axios from "axios";

export const issuesModule = {
    state: () => ({
        isLoading: false,
        currentRepo: {},
        currentIssues: {},
        countIssues: 0,
        hasNextPage: false,
        endCursor: '',
        hasPreviousPage: false,
        startCursor: ''
    }),
    getters: {},
    mutations: {
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading
        },
        setCurrentRepo(state, repo) {
            state.currentRepo = repo
        },
        setCurrentIssues(state, issues) {
            state.currentIssues = issues
        },
        setCountIssues(state, count) {
            state.countIssues = count
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
        async fetchIssues({commit, state}, name) {
            commit('setIsLoading', true)
            try {
                const response = await axios.post(
                    `https://api.github.com/graphql`,
                    {
                        "query": `query MyQuery {
  repository(name: "${name}", owner: "${state.currentRepo.owner.login}") {
    issues(first: 20, orderBy: {field: CREATED_AT, direction: ASC}) {
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
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
}`,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'token ' + this.state.repositories.token,
                        },
                    }
                )
                commit('setCurrentIssues', response.data.data.repository.issues)
                commit('setCountIssues', response.data.data.repository.issues.nodes.length)
                commit('setHasNextPage', response.data.data.repository.issues.pageInfo.hasNextPage)
                commit('setEndCursor', response.data.data.repository.issues.pageInfo.endCursor)
                commit('setHasPreviousPage', response.data.data.repository.issues.pageInfo.hasPreviousPage)
                commit('setStartCursor', response.data.data.repository.issues.pageInfo.startCursor)
            } catch (err) {
                alert(err.response.data.message)
            } finally {
                commit('setIsLoading', false)
            }
        },
        async fetchPrevIssues({commit, state}) {
            commit('setIsLoading', true)
            try {
                const response = await axios.post(
                    `https://api.github.com/graphql`,
                    {
                        "query": `{
  repository(name: "${state.currentRepo.name}", owner: "${state.currentRepo.owner.login}") {
    issues(
      first: 20
      orderBy: {field: CREATED_AT, direction: ASC}
      before: "${state.startCursor}"
    ) {
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
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
}`,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'token ' + this.state.repositories.token,
                        },
                    }
                )
                commit('setCurrentIssues', response.data.data.repository.issues)
                commit('setCountIssues', response.data.data.repository.issues.nodes.length)
                commit('setHasNextPage', response.data.data.repository.issues.pageInfo.hasNextPage)
                commit('setEndCursor', response.data.data.repository.issues.pageInfo.endCursor)
                commit('setHasPreviousPage', response.data.data.repository.issues.pageInfo.hasPreviousPage)
                commit('setStartCursor', response.data.data.repository.issues.pageInfo.startCursor)
            } catch (err) {
                alert(err.response.data.message)
            } finally {
                commit('setIsLoading', false)
            }
        },
        async fetchNextIssues({commit, state}) {
            commit('setIsLoading', true)
            try {
                const response = await axios.post(
                    `https://api.github.com/graphql`,
                    {
                        "query": `{
  repository(name: "${state.currentRepo.name}", owner: "${state.currentRepo.owner.login}") {
    issues(
      first: 20
      orderBy: {field: CREATED_AT, direction: ASC}
      after: "${state.endCursor}"
    ) {
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
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
}`,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'token ' + this.state.repositories.token,
                        },
                    }
                )
                console.log(response)
                commit('setCurrentIssues', response.data.data.repository.issues)
                commit('setCountIssues', response.data.data.repository.issues.nodes.length)
                commit('setHasNextPage', response.data.data.repository.issues.pageInfo.hasNextPage)
                commit('setEndCursor', response.data.data.repository.issues.pageInfo.endCursor)
                commit('setHasPreviousPage', response.data.data.repository.issues.pageInfo.hasPreviousPage)
                commit('setStartCursor', response.data.data.repository.issues.pageInfo.startCursor)
            } catch (err) {
                alert(err.response.data.message)
            } finally {
                commit('setIsLoading', false)
            }
        }
    },
    namespaced: true
}