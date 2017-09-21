const NowClient = require('now-client')

const now = new NowClient(process.env.NOW_TOKEN)

const main = async () => {
  const deployments = await now.getDeployments()
  if (deployments.length >= 3) { // upper limit for free plan
    const aliases = await now.getAliases()
    const mociId = (aliases.find(a => a.alias === 'moci.now.sh') || {}).deploymentId
    const target = deployments.filter(d => d.uid !== mociId).pop()
    await now.deleteDeployment(target.uid)
    console.log(`Success!

Deployment ${target.uid} removed

`)
  } else {
    console.log('Does not require delete.')
  }
}

main()
