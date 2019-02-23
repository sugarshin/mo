/* eslint-disable no-console */

const NowClient = require('./NowClient')

const now = new NowClient(process.env.NOW_TOKEN)

const main = async () => {
  const aliases = await now.getAliases()
  const mociId = (aliases.find(a => a.alias === 'moci.now.sh') || {}).deploymentId
  if (mociId) {
    const deployments = await now.getDeployments()
    const targets = deployments.filter(d => d.uid !== mociId)
    if (targets.length > 0) {
      await Promise.all(targets.map(d => now.deleteDeployment(d.uid)))

      console.log(`Success!

${targets.map(t => `Deployment ${t.uid} removed`).join('\n')}

`)
      return
    }

    console.log('No deployments')
  }

  console.log('No `moci.now.sh` Aliase')
}

main()
