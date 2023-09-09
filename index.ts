import express ,{Request,Response} from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";


const app = express();

app.use(express());
app.use(morgan("dev"));
app.use(express.json())



const prisma = new PrismaClient();


app.post('/', async(req:Request, res:Response) => {
    const {username , password} = req.body;
   try{
     const user = await prisma.user.create({
       data: {
         username,
         password,
       },
     });

     res.status(200).json({
       status: "success",
       data: user,
     });

   }catch(err){
    res.status(400).json({
        status:'fail',
        message:'could not create user'
    })
   }
});
app.post('/createManyUsers', async(req:Request, res:Response) => {
    const {userList} = req.body;
   try{
     const users = await prisma.user.createMany({
       data: userList
     });

     res.status(200).json({
       status: "success",
       data: users,
     });

   }catch(err){
    res.status(400).json({
        status:'fail',
        message:err
    })
   }
});
app.post('/createManyCars', async(req:Request, res:Response) => {
    const {carList} = req.body;
   try{
     const cars = await prisma.car.createMany({
       data: carList
     });

     res.status(200).json({
       status: "success",
       data: cars,
     });

   }catch(err){
    res.status(400).json({
        status:'fail',
        message:err
    })
   }
});


app.get('/:id',async(req:Request, res:Response) => {
     try{
        const {id} = req.params
          const user = await prisma.user.findUnique({
              where:{
                  id:Number(id)
              }
          })

          res.status(200).json({
              status:'success',
              data:user
          })
     }catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        })

     }


})



app.get('/', async (req:Request, res:Response) => {

    

     try {
      const users = await prisma.user.findMany({include:{cars:true}});
      res.status(200).json({
        status: "success",
        data: users,
      });
     } catch (err) {
       res.status(400).json({
         status: "fail",
         message: err,
       });
     }
});
app.put('/', async (req:Request, res:Response) => {
    try{
        const { username, id } = req.body;
        const updateUser = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            username: username,
          },
        });

        res.status(200).json({
          statusbar: "success",
          data: updateUser,
        });
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
});
app.delete('/:id',async (req:Request, res:Response) => {
    try{
        const { id } = req.params;
        const deleteUser = await prisma.user.delete({
          where: {
            id: Number(id),
          },
        });

        res.json(deleteUser);
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
});





app.listen(3001,()=>{
    console.log('server running on port 3001');
    
})