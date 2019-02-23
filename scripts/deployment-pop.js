/* eslint-disable no-console */

const NowClient = require('./NowClient')

const now = new NowClient(process.env.NOW_TOKEN)

const main = async () => {
  const deployments = await now.getDeployments()
  const instanceCount = deployments.reduce((num, d) => num + (d.scale && d.scale.current ? d.scale.current : 0), 0)
  if (instanceCount >= 3 || deployments.length >= 3) {
    // upper limit for free plan
    const aliases = await now.getAliases()
    const mociId = (aliases.find(a => a.alias === 'moci.now.sh') || {}).deploymentId
    const targets = deployments.filter(d => d.uid !== mociId).filter(d => d.scale.current > 0)
    const oldest = Math.min(...targets.map(d => d.created))
    const target = targets.find(d => d.created === oldest)
    await now.deleteDeployment(target.uid)
    console.log(`Success!

Deployment ${target.uid} removed

`)
  } else {
    console.log('Does not require delete.')
  }
}

main()
