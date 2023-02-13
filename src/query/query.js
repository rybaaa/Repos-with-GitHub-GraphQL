export default '{\n' +
'  repositoryOwner(login: "octocat") {\n' +
'    repositories(first: 20, orderBy: {field: NAME, direction: ASC}) {\n' +
'      totalCount\n' +
'      pageInfo {\n' +
'        hasNextPage\n' +
'        endCursor\n' +
'        hasPreviousPage\n' +
'        startCursor\n' +
'      }\n' +
'      nodes {\n' +
'        name\n' +
'        issues(first: 100) {\n' +
'          edges {\n' +
'            node {\n' +
'              id\n' +
'              title\n' +
'              state\n' +
'              bodyText\n' +
'              comments(first: 100) {\n' +
'                pageInfo {\n' +
'                  endCursor\n' +
'                  hasNextPage\n' +
'                }\n' +
'                nodes {\n' +
'                  bodyText\n' +
'                  createdAt\n' +
'                }\n' +
'              }\n' +
'            }\n' +
'          }\n' +
'          totalCount\n' +
'        }\n' +
'      }\n' +
'    }\n' +
'    login\n' +
'  }\n' +
'}'