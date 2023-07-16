import React ,{useState,useEffect, Fragment} from 'react';
import { FloatingLabel } from 'react-bootstrap';
import "./CandyCrush.css"
const Width=8;
const CandyImages=[
        "/images/blueCandy.jpg",
        "/images/redCandy.jpg",
        "/images/yellowCandy.jpg",
        "/images/greenCandy.jpg",
        "/images/orangeCandy.jpg",
        "/images/purpleCandy.jpg"
    ]
const blankCandy="/images/blankCandy.jpg";
const CandyCrush = () => {
    const [currentBoardImages, setcurrentBoardImages] = useState([]);
    const [dragedImage,setDragedImage]=useState(null);
    const [replaceImage,setReplaceImage]=useState(null);
    const createBoard=()=>{
        const boardRandomColors=[]
        let currentColor;
        for(let i=0;i<Width*Width;i++)
        {  
           currentColor=CandyImages[Math.floor(Math.random()*CandyImages.length)];
           boardRandomColors.push(currentColor);
        }
        setcurrentBoardImages(boardRandomColors);
    }
    const checkFourColumn=()=>{
        let  flag=false;
        for(let i=0;i<40;i++){
            let inSameColumn=[i,i+Width,i+2*Width,i+3*Width]
            let fourConnect=inSameColumn.every((index)=>currentBoardImages[index]===currentBoardImages[i]);
            
            if(fourConnect &&currentBoardImages[i] && currentBoardImages[i]!="")
            {
                inSameColumn.map((index)=>{
                    currentBoardImages[index]=""
                    console.log(index)
                })
                flag=inSameColumn.includes(+replaceImage?.id)|| inSameColumn.includes(+dragedImage?.id)
            }
        }
        return flag;
    }

    const checkThreeColumn=()=>{
        let flag=false;
        for(let i=0;i<48;i++){
            let inSameColumn=[i,i+Width,i+2*Width]
            let threeConnect=inSameColumn.every((index)=>currentBoardImages[index]===currentBoardImages[i]);           
            if(threeConnect &&currentBoardImages[i] && currentBoardImages[i]!="")
            {
                inSameColumn.map((index)=>{
                    currentBoardImages[index]=""
                    console.log(index)
                })
                flag=inSameColumn.includes(+replaceImage?.id)|| inSameColumn.includes(+dragedImage?.id)
            }
           
        }
        return  flag;
    }
    const checkThreeRow=()=>{
        let flag=false ;
        for(let i=0;i<62;i++){
            const endRowsIndex=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63];
            if(!endRowsIndex.includes(i)){
                const inSameRow=[i,i+1,i+2]
                let threeConnect=inSameRow.every((index)=>currentBoardImages[index]===currentBoardImages[i]);           
                if(threeConnect &&currentBoardImages[i] && currentBoardImages[i]!="")
                {                    
                    inSameRow.map((index)=>{
                        currentBoardImages[index]=""
                        console.log(index)
                    })
                    flag=inSameRow.includes(+replaceImage?.id)|| inSameRow.includes(+dragedImage?.id)

                }

            }
        }
        return flag;
    }
    const checkFourRow=()=>{
        let flag=false;
        for(let i=0;i<62;i++){
            const endRowsIndex=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,61,62,63];
            if(!endRowsIndex.includes(i)){
                const inSameRow=[i,i+1,i+2,i+3]
                let fourConnect=inSameRow.every((index)=>currentBoardImages[index]===currentBoardImages[i]);           
                if(fourConnect &&currentBoardImages[i] && currentBoardImages[i]!="")
                {                    
                    inSameRow.map((index)=>{
                        currentBoardImages[index]=""
                    })
                    flag=inSameRow.includes(+replaceImage?.id)|| inSameRow.includes(+dragedImage?.id)  
                }
            }
          
        }
        return flag;
    }
   
    const handleDrop=(e)=>{
        console.log("drag drop",e.target.id)
       setReplaceImage(e.target)
    }
    const handleDragEnd=async()=>{
        console.log("drag end", dragedImage?.id,replaceImage?.id)
        
        const dragedImageID=+dragedImage?.id;
        const replaceImageID=+replaceImage?.id;

        const validMoves=[dragedImageID+1,dragedImageID+Width,dragedImageID-Width,dragedImageID-1];

        if(validMoves.includes(replaceImageID)&& replaceImage){
            currentBoardImages[dragedImageID]=replaceImage?.attributes.src.nodeValue;
            currentBoardImages[replaceImageID]=dragedImage?.attributes.src.nodeValue;

            const isFourColumn= await checkFourColumn();
            const isThreeColumn= await checkThreeColumn();
            const isFourRow=await checkFourRow();
            const isThreeRow=await checkThreeRow();

            if(isThreeColumn||isThreeRow||isFourColumn||isFourRow)
            {
                setReplaceImage(null);
                setDragedImage(null);  //mm
            }
            else
            {
                currentBoardImages[dragedImageID]=dragedImage?.attributes.src.nodeValue;
                currentBoardImages[replaceImageID]=replaceImage?.attributes.src.nodeValue;
            }
        }
        else
        {
            currentBoardImages[dragedImageID]=dragedImage?.attributes.src.nodeValue;
            currentBoardImages[replaceImageID]=replaceImage?.attributes.src.nodeValue;
        }
        setcurrentBoardImages([...currentBoardImages]); 
    }
    const dragStart=(e)=>{
        setDragedImage(e.target)
       console.log("drag start",e.target.id)
        ////mm
    }
    const moveDown=()=>{
        for(let i=0;i<56;i++){
            let currentImage=currentBoardImages[i];
            if(currentImage!="" && currentImage &&currentBoardImages[i+Width]=="")
            {
                currentBoardImages[i+Width]=currentImage
                currentBoardImages[i]="";
                setcurrentBoardImages([...currentBoardImages])
            }
        }
    }
    const replaceBlank=()=>{
        for(let i=0; i<8;i++)
        {
            if(currentBoardImages[i]==""){
                currentBoardImages[i]=CandyImages[Math.floor(Math.random()*CandyImages.length)];
                setcurrentBoardImages([...currentBoardImages]);
            }
        }
         //mmmmm
    }

    useEffect(() => {
        createBoard()
        return () => {
            setcurrentBoardImages([])
        };
    }, []);
    useEffect(()=>{
        let timer=setInterval(() => {
            moveDown();
            replaceBlank();
            console.log("hello")
        }, 10);
        return()=>clearInterval(timer);
    },[checkFourColumn,checkFourRow,checkThreeRow,checkThreeRow]) ;
    useEffect(()=>{
        checkFourColumn();
        checkThreeColumn();
        checkFourRow();
        checkThreeRow();
    },[createBoard])
    return (
        <div className='board'>
            {
                currentBoardImages?.map((image,index)=>{
                    
                    return (
                        <img className='cell' key={index} src={image} 
                            id={index} draggable={true} 
                            onDragStart={dragStart}  
                            onDragOver={(e)=>{e.preventDefault()}}
                            onDragEnter={(e)=>{e.preventDefault()}}
                            onDragLeave={(e)=>{e.preventDefault()}}
                            onDrop={handleDrop}
                            onDragEnd={handleDragEnd}
                        />
                    )
                })
            }
        </div>
    );
}


export default CandyCrush;
// 01501530882 













    
    
   