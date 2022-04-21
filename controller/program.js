const Program = require('../model/program')
const ProgramType = require('../model/prograqm_type')

exports.addProgram = async (req,res) => {

  if(Object.keys(req.body).length === 0){
    return res.status(400).send({message: "Content can not be empty"})
  }

  let program = await Program.findOne({name: req.body.name})
  if(program){
    return res.status(400).send({error: 'Word with this name already exist.'})
  }

  const type_id = req.body.program_type_id
  let program_type = await ProgramType.findOne({_id: type_id})
  if(!program_type){
    return res.status(400).send({error: 'Program type not found.'})
  }

  program = new Program({
    name: req.body.name,
    describtion: req.body.describtion,
    picture: req.body.picture,
    program_type: {_id:  program_type._id}
  })
  try{
    await program.save()
    res.status(201).send(program)
  }catch(error){
    res.status(500).send(error);
  }

 
}

exports.getPrograms = async (req,res)=>{

  try{
    const programs = await Program.find({})
    if(!programs){
      return res.status(404).send({error: `Programs don\'t exist`})
    }
    res.status(200).send(programs)
  }catch(error){
    res.status(500).send(error)
  }
}

exports.getProgramById = async (req,res)=>{

  const progrm_id = req.params.id
  try{  
    const program = await Program.findOne({_id: progrm_id}) 
    res.status(200).send(program)
  }catch(error){
    res.status(500).send(error)
  }
}

exports.editProgram = async (req,res)=>{
  const id = req.params.id
  if(Object.keys(req.body).length === 0){
    return res.status(400).send({message: "Content can not be empty"})
  }
  const {name,describtion,picture} = req.body
  let program_type = await ProgramType.findOne({_id: req.body.program_type_id})  
  if(!program_type){
    return res.status(400).send({error: 'Program type not found.'})
  }
 
  try{
    const updated = await Program.findByIdAndUpdate({_id: id}, {
      name,
      describtion,
      picture,
      program_type: {_id:  program_type._id}
    },{ new: true })
    if(!updated){
      return res.status(400).send({error: `Program with id ${id} does not exist`})
    }
    await updated.save()
    res.status(200).send(updated)
  }catch(error){
    res.status(500).send(error)
  }

}

exports.deleteProgram = async (req,res) => {
  const _id = req.params.id
  try{
    const deletedProgram = await Program.findByIdAndDelete({_id: _id})
    if(!deletedProgram){
      return res.status(400).send({error: `Program  not found`})
    }
    res.status(200).send(deletedProgram)
  }catch(error){
    res.status(500).send(error)
  }

}


