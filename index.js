// const express = require('express')
const axios = require('axios')

async function getUser(user) {
  try {
    const response = await axios.get(`https://api.github.com/users/${user}`)
    return response.data
  } catch (error) {
    return error
  }
}

async function getFollowers(folowersURL) {
  try {
    const response = await axios.get(folowersURL)
    return response.data
  } catch (error) {
    return error
  }
}

const user = 'lukehmu'

getUser(user)
  .then(data => data.followers_url)
  .then(followersURL => getFollowers(followersURL))
  .then((followerData) => {
    const promises = []
    Object.keys(followerData).forEach((follower) => {
      promises.push(getUser(followerData[follower].login))
    })
    Promise.all(promises).then((followersProfiles) => {
      console.log(followersProfiles)
    })
  })
