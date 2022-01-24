
import { Router } from 'express';
import os from 'os'

let data = {}

const routes = new Router();

routes.get('/',(req,res) =>{
    
    data['argenv']   = process.argv.splice(2)
    data['platform'] = process.platform
    data['version_node'] = process.version
    data['memory_rss'] = process.memoryUsage().rss
    data['exec_path'] = process.execPath
    data['process_id'] = process.pid
    data['project_folder'] = process.cwd()
    data['project_folder'] = process.cwd()
    data['total_cpu'] = os.cpus().length

    res.send(data)
})

export default routes
