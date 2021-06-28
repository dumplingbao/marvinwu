---




Status: 
Date: 2021-05-12
Topic:
-  GitLab Ci
-  Vercel Deployment
Ref:

---




#How to integrate Gitlab with vercel deployment and run cypress test in parallel



## Outline

* gitlab stage to trigger vercel deployment

* can use vercel cli 


```yml
vercel-deploy:
  stage: vercel-deploy
  image: node:12-alpine
  dependencies: []
  artifacts:
    paths:
      - vercel_deployment_url.txt
  script:
    - npm i -g vercel
    - DEPLOYMENT_URL=$(vercel -t $VERCEL_TOKEN --confirm)
    - echo $DEPLOYMENT_URL >> vercel_deployment_url.txt
    - cat vercel_deployment_url.txt


```

* install cypress and other dev depenency, run the test


* how to make gitlab runner parallel run ?

```yml
.job_template:
  image: cypress/browsers:node12.14.1-chrome85-ff81
  stage: cypress-test
  artifacts:
    when: always
    paths:
      - cypress/videos/**/*.mp4
      - cypress/screenshots/**/*.png
    expire_in: 1 day

cypress-runner-1:
  extends: .job_template
  script:
    - export CYPRESS_BASE_URL=$(cat vercel_deployment_url.txt)
    - echo $CYPRESS_BASE_URL
    - npm install
    - yarn cy:run --spec "cypress/integration/sanity_1/*.js"

cypress-runner-2:
  extends: .job_template
  script:
    - export CYPRESS_BASE_URL=$(cat vercel_deployment_url.txt)
    - echo $CYPRESS_BASE_URL
    - npm install
    - yarn cy:run --spec "cypress/integration/sanity_2/*.js"


```

