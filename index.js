const {Pool} = require('pg');


// create table estudiantes(rut varchar(12) not null primary key, nombre varchar(50) not null, curso varchar(30) not null, nivel varchar(10) not null);
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'always_music',
    password: 'postgres',
    port: 5432
}

const pool = new Pool(config);

const data = process.argv.slice(2);
const funcion = data[0];
const nombre = data[1];
const rut = data[2];
const curso = data[3];
const nivel = data[4];


const nuevoEstudiante = async()=>{
    try{
        await pool.query(
            `INSERT INTO estudiantes(nombre, rut, curso, nivel) values('${nombre}', '${rut}', '${curso}', '${nivel}');`
        );
        console.log('Estudiante '+nombre+' agregado con exito');
        
    }catch(error){
        console.log(error.code);
    }finally{
        pool.end();
    }
}

const consultaEstudiantes = async()=>{
    try{
        const res = await pool.query(
            `SELECT * FROM estudiantes;`
        );
        console.log("Registro Actual ", res.rows);
        
    }catch(error){
        console.log(error.code);
    }finally{
        pool.end();
    }
}

const editarEstudiante = async()=>{
    try{
        await pool.query(
            `UPDATE estudiantes SET nombre='${nombre}', curso='${curso}', nivel = '${nivel}' WHERE rut='${rut}' ;`
        );
        console.log(`Estudiante ${nombre} editado con exito`);
        
    }catch(error){
        console.log(error.code);
    }finally{
        pool.end();
    }
}

const rutEstudiante = async()=>{
    try{
        const res = await pool.query(
            `SELECT * from estudiantes where rut ='${rut}'`
        );
        console.log(res.rows);
        
    }catch(error){
        console.log(error.code);
    }finally{
        pool.end();
    }
}

const eliminarEstudiante = async()=>{
    try{
        await pool.query(
            `DELETE from estudiantes where rut ='${rut}'`
        );    
        console.log(`Registro de estudiante con rut ${rut} eliminado`)
    }catch(error){
        console.log(error.code);
    }finally{
        pool.end();
    }
}

// IIFE
(async () =>{
    if(funcion === 'nuevo'){
        await nuevoEstudiante();
    }else if(funcion === 'consulta'){
        await consultaEstudiantes();
    }else if(funcion === 'editar'){
        await editarEstudiante();
    }else if(funcion === 'rut'){
        await rutEstudiante();
    }else if(funcion === 'eliminar'){
        await eliminarEstudiante();
    }
    else{
        console.log('Función ingresada no se encuentra registrada');
    }
})();

