import { AngularLinkOptions, StrapiEnvironment, versionDate } from "./environment.common";


const environmentLettiral = StrapiEnvironment.Development;

export const environment = {
    angularLink: AngularLinkOptions.Local,
    strapiLink: `${environmentLettiral}`,
    strapiLinkApi: `${environmentLettiral}/api`,
    clientId: '09165fbc-ca4b-40a4-8793-61f0705cc2cc',
    tenantId: '63b31d67-0760-4768-abaa-aff3eb41289e',
    versionDate
}
