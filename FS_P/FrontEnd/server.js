const { debug } = require('console');
const http=require('http');
const { listen } = require('../BackEnd/app');
const app=require('../BackEnd/app');

//intial server response testing
// const server=http.createServer((req,res)=>{
//   res.end('Response Testing 2');
// });

const normalizePort=val=>{
  var port=parseInt(val,10);

  if(isNaN(port)){
    return val;
  }

  if(port>=0){
    return port;
  }
  return false;
};

const onError=error=>{
  if(error.syscall !=='listen'){
    throw error;
  }
  const bind=typeof addr ==='string'? 'pipe' + addr: 'port'+port;
  switch(error.code){
    case 'EACCESS':
      console.error(bind+' requires elevated privilages');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind+' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};
const onListening =()=> {
  const addr=server.address();
  const bind = typeof addr ==='string' ? 'pipe' + addr:'port '+ port;
  debug('Litening on '+bind);
};

const port=(process.env.PORT || 3000);
app.set('port',port);

const server=http.createServer(app);
server.on('error',onError);
server.on('listening', onListening);
server.listen(port);
