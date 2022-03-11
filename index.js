const  express=require("express")
const mongoose= require("mongoose");
const app =express();
app.use(express.json());

const connect=()=>{
    return mongoose.connect(
        "mongodb+srv://root:root@cluster0.qjkk0.mongodb.net/test"
    );
};
const authorschema=new mongoose.Schema(
    {
    first_name:{type:String,required:true},
    last_name:{type:String,required:false},
    },
    {
        timestamps:true,
    }
);
const Author= mongoose.model("author",authorschema);

const bookSchema= new mongoose.Schema(
  {
    books_name:{type:String,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"author",
        required:true,
    },
},
{
    timestamps:true,
}
);
const Book=mongoose.model("book",bookSchema);
const sectionschema=new mongoose.Schema(
  {
    book_type:{type:String,required:true},
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
},
{
    timestamps:true,
}
)
const Section =mongoose.model("section",sectionschema)
app.get("/author",async (req,res)=>{
    try{
        const authors=await Author.find().lean().exec();
        return res.status(200).send({authors:authors});
    }
    catch (err){
          console.log(err)
          .send({message:"something went wrong"})
    }
});
app.post("/author",async(req,res)=>{
    try{
        const author =await Author.create(req.body);
        return res.status(201).send(author);
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.get("/author/:id", async (req, res) => {
    try {
      const author = await Author.findById(req.params.id).lean().exec();
  
      return res.status(200).send(author);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  app.patch("/author/:id", async (req, res) => {
    try {
      const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
      
  
      return res.status(200).send(author);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  app.delete("/author/:id", async (req, res) => {
    try {
      const  author= await Author.findByIdAndDelete(req.params.id).lean().exec();

  
      return res.status(200).send(author);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
//`````````````````````````````````````````````````````````````````````````

  app.get("/book",async (req,res)=>{
    try{
        const books=await Book.find().lean().exec();
        return res.status(200).send({authors:books});
    }
    catch (err){
          console.log(err)
          .send({message:"something went wrong"})
    }
});
app.post("/book",async(req,res)=>{
    try{
        const book =await Book.create(req.body);
        return res.status(201).send(book);
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.get("/author/:id", async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).lean().exec();
  
      return res.status(200).send(book);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  app.patch("/book/:id", async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      return res.status(200).send(book);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  app.delete("/book/:id", async (req, res) => {
    try {
      const  book= await Book.findByIdAndDelete(req.params.id).lean().exec();

  
      return res.status(200).send(book);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  //````````````````````````````````````````````````````````````````````````````````
  app.get("/section",async (req,res)=>{
    try{
        const sections=await Section.find().lean().exec();
        return res.status(200).send({section:section});
    }
    catch (err){
          console.log(err)
          .send({message:"something went wrong"})
    }
});
app.post("/section",async(req,res)=>{
    try{
        const section =await Section.create(req.body);
        return res.status(201).send(section);
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.get("/section/:id", async (req, res) => {
    try {
      const section= await Section.findById(req.params.id).lean().exec();
  
      return res.status(200).send(section);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  app.patch("/section/:id", async (req, res) => {
    try {
      const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      return res.status(200).send(section);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  app.delete("/book/:id", async (req, res) => {
    try {
      const  section= await Section.findByIdAndDelete(req.params.id).lean().exec();

  
      return res.status(200).send(section);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

app.listen(5000,async()=>{
    try{
        await connect();
    }
    catch(err){
        console.log(err);
    }
    console.log("listening on port 5000");
})
