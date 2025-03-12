const ActiveStatusList = [
  {
    value: true,
    label: 'common.active',
  },
  {
    value: false,
    label: 'common.inactive',
  },
]

const PublishStatusList = [
  {
    value: true,
    label: 'common.yes',
  },
  {
    value: false,
    label: 'common.no',
  },
]

const enum CookieStorageKeys {
  USER_INFO = 'user_info',
}

export { ActiveStatusList, PublishStatusList, CookieStorageKeys }
