export default '{\n' +
'  repositoryOwner(login: "octocat") {\n' +
'    repositories(first: 20, orderBy: {field: NAME, direction: ASC}) {\n' +
'      totalCount\n' +
'      pageInfo {\n' +
'        hasNextPage\n' +
'        endCursor\n' +
'      }\n' +
'      nodes {\n' +
'        name\n' +
'        issues(first: 3) {\n' +
'          edges {\n' +
'            node {\n' +
'              id\n' +
'              title\n' +
'              state\n' +
'              bodyText\n' +
'              comments(first: 3) {\n' +
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