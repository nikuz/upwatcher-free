'use strict';

export const APP_NAME = 'Upwatcher';

// UPWORK
export const UPWORK_URL = 'https://www.upwork.com';
export const UPWORK_TOKEN_URL = '/api/auth/v1/oauth/token/request';
export const UPWORK_VERIFIER_URL = '/services/api/auth';
export const UPWORK_ACCESS_URL = '/api/auth/v1/oauth/token/access';
export const UPWORK_JOBS_URL = '/api/profiles/v2/search/jobs.json';
export const UPWORK_JOBS_CATEGORIES = '/api/profiles/v2/metadata/categories.json';
export const UPWORK_JOB_URL = '/api/profiles/v1/jobs/{id}.json';
export const UPWORK_JOBS_DAYS_POSTED = '50';

// cache
export const JOBS_PER_PAGE = 20;
export const FAVORITES_LIMIT = 50;

// LOGGLY
export const LOGGLY_URL = 'https://logs-01.loggly.com';
export const LOGGLY_TAG = 'upwatcher-native';
