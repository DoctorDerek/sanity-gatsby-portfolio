export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '603ef4834f0e348ce98c4644',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-portfolio-studio-t3ucve1p',
                  apiId: '89ab6900-0515-4c52-9dc5-e80860cc3460'
                },
                {
                  buildHookId: '603ef484b8fa02946954e7c2',
                  title: 'Portfolio Website',
                  name: 'sanity-gatsby-portfolio-web-2jzfj9jj',
                  apiId: '4c759c17-d9af-475b-af23-fe376dde5cab'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/DoctorDerek/sanity-gatsby-portfolio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://sanity-gatsby-portfolio-web-2jzfj9jj.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
