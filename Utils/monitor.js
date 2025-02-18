import OS from 'node:os';

function monitor() {
    const oldCpus = OS.cpus();
    setTimeout(() => {
        const newCpus = OS.cpus();
        const usage = newCpus.map((cpu, i) => {
            return {
                Core : i,
                Usage: calculateCPUUsage(oldCpus[i], newCpus[i]) + '%'
            }
        });
        console.clear();
        console.log('CPU Usage:');
        console.table(usage);
        console.log('Memory Used: ', usedMemory()) ;
        console.log('CPU Running Time: ',cpuUPTime()) ;
    }, 1000);
 
}

function calculateCPUUsage(oldCpus, newCpus) {
    const oldTotal = Object.values(oldCpus.times).reduce((a, b) => a + b);
    const newTotal = Object.values(newCpus.times).reduce((a, b) => a + b);
    const total = newTotal - oldTotal;
    const idle = newCpus.times.idle - oldCpus.times.idle;
    const used = total - idle;
    return ((used / total) * 100).toFixed(2);
}

function usedMemory(){
    const totalMem = OS.totalmem();
    const freeMem = OS.freemem();
    const GB = 1024 * 1024 * 1024;
    return ((totalMem - freeMem) / GB).toFixed(2) + ' GB / ' +  (totalMem / GB).toFixed(2) + 'GB';
}

function cpuUPTime(){
    return  (OS.uptime() / 3600).toFixed(2) + ' Hours';
}

export default monitor;