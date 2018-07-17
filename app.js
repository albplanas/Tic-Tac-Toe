var Run=(function(){

    function Inic_board(){
     this.arr=[0,0,0,0,0,0,0,0,0];
 }
 var Player_counter=0;
 var Computer_counter=0;
 const C_type='O';
 const P_type='X';
 var Current_board;
 var turn=true;
 var new_game=function(){
     for(var i=0;i<3;i++){
                 for(var j=0;j<3;j++){
                     $('#'+i+'-'+j).html('<p></p>');  
                 }
             }
             console.log(Player_counter,"value");
             console.log(Computer_counter,"value");
             $('#player-1').html(Player_counter);
             $('#player-2').html(Computer_counter);
            // $('.new_game').css({"display":"block"});
    var Current_board=new Inic_board();
    var turn=true;
   return {
       board:Current_board.arr,
       turn :true
   }
    
     }
 

 var Conv=function(i,j){
  return i*3+j;
 }
Check_Row=function(board,i){
   var sum_row=board[Conv(i,0)]+board[Conv(i,1)]+board[Conv(i,2)];
   return sum_row;
};
Check_Column=function(board,i){
   var sum_col=board[Conv(0,i)]+board[Conv(1,i)]+board[Conv(2,i)];
   return sum_col;
};
Check_Diag1=function(board){
   var sum_col=board[Conv(0,0)]+board[Conv(1,1)]+board[Conv(2,2)];
   return sum_col;
};
Check_Diag2=function(board){
   var sum_col=board[Conv(0,2)]+board[Conv(1,1)]+board[Conv(2,0)];;
   return sum_col;
};
var IS_Pssb_play_again=function(board){
   for(var i=0;i<3;i++){
     for(var j=0;j<3;j++){
        if(board[Conv(i,j)]===0){
            return true;
        }
     }    
   }

       return false;
  
}

var Surv_Row=function(board,type){
   if(type==='X'){
     for(var i=0;i<3;i++){
       if(Check_Row(board,i)===8){
         for(var j=0;j<3;j++){
             if(board[Conv(i,j)]===0)
             {
                 return {row:i,col:j};
             }
         }
       }
   }
   return {row:-1,col:-1};
   }
   
   if(type==='O'){
     for(var i=0;i<3;i++){
       if(Check_Row(board,i)===2){
         for(var j=0;j<3;j++){
             if(board[Conv(i,j)]===0)
             {
                 return {row:i,col:j};
             }
         }
       }
   }
   return {row:-1,col:-1};
   }
   
}
var Surv_Col=function(board,type){
   if(type==='X'){
     for(var i=0;i<3;i++){
       if(Check_Column(board,i)===8){
         for(var j=0;j<3;j++){
             if(board[Conv(j,i)]===0)
             {
                 return {row:j,col:i};
             }
         }
       }
   }
   return {row:-1,col:-1};
   }
   
   if(type==='O'){
     for(var i=0;i<3;i++){
       if(Check_Column(board,i)===2){
         for(var j=0;j<3;j++){
             if(board[Conv(j,i)]===0)
             {
                 return {row:j,col:i};
             }
         }
       }
   }
   return {row:-1,col:-1};
   }
   
}
var Surv_Diag=function(board,type){
 if(type==='X'){
       if(Check_Diag1(board)===8){
         for(var i=0;i<3;i++){
             if(board[Conv(i,i)]===0)
             {
                 return {row:i,col:i};
             }
         }
       }
       if(Check_Diag2(board)===8){
         for(var i=0;i<3;i++){
             if(board[Conv(2-i,i)]===0)
             {
                 return {row:2-i,col:i};
             }
         }
       }
   return {row:-1,col:-1};
   }
   if(type==='O'){
       if(Check_Diag1(board)===2){
         for(var i=0;i<3;i++){
             if(board[Conv(i,i)]===0)
             {
                 return {row:i,col:i};
             }
         }
       }
       if(Check_Diag2(board)===2){
         for(var i=0;i<3;i++){
             if(board[Conv(2-i,i)]===0)
             {
                 return {row:2-i,col:i};
             }
         }
       }
   return {row:-1,col:-1};
   }


}

var Survival=function(board,type){
     if(Surv_Row(board,type).row!==-1)
     {
         return Surv_Row(board,type);
     }
     if(Surv_Col(board,type).row!==-1)
     {
         return Surv_Col(board,type);
     }
     if(Surv_Diag(board,type).row!==-1)
     { 
         return Surv_Diag(board,type); 
     }
     return {row:-1,col:-1};
}
var  Who_winn=function(board){
   for(var i=0;i<3;i++){
     if(Check_Row(board,i)===3)
         {return 1;}
     if(Check_Row(board,i)===12)
         {return 4;}    
   }
   for(i=0;i<3;i++){
     if(Check_Column(board,i)===3)
         {return 1;}
     if(Check_Column(board,i)===12)
         {return 4;}    
   }
     if(Check_Diag1(board)===3)
         {return 1;}
     if(Check_Diag1(board)===12)
         {return 4;}  
     if(Check_Diag2(board)===3)
         {return 1;}
     if(Check_Diag2(board)===12)
         {return 4;}     
   return 0;
 }
 



var Verify=function(board){
         //verify the board
                 if(Who_winn(board)===4){
                     $('#text_ng').html("Player Wins!!!");
                     $('.new_game').css({"display":"block"});
                     return {
                        bool: false,
                        value:4
                     }
                 }
                 else if(Who_winn(board)===1){
                     $('#text_ng').html("Computer Wins!!!");
                     $('.new_game').css({"display":"block"});
                     return {
                        bool: false,
                        value:1
                     }
                 }
                 
                 if(IS_Pssb_play_again(board)===false){
                     $('#text_ng').html("TIE");
                     $('.new_game').css({"display":"block"});
                     return {
                        bool: false,
                        value:0
                     }
                 }
                 return {
                        bool: true,
                        value:-1
                     }
         }


var The_move_Comp=function(board,C_type){
     var pos=new Array();
     var cont=0;
     var ptype;
     if(C_type==="X")
         {ptype="O";}
     else{ptype="X";}
      
     //Winner moved
     if(Survival(board,C_type).row!==-1)
       {return Survival(board,C_type);}
        //Loser moved
     if(Survival(board,ptype).row!==-1)
       {return Survival(board,ptype);}
     
     
       //A la my love moved
     for(var i=0;i<3;i++){
         for(var j=0;j<3;j++){
             if(board[Conv(i,j)]===0){
                 pos[cont]={row:i,col:j};
                 cont++;
             }
         }   
     }

     var ind=parseInt(Math.random()*cont);
     return pos[ind];
 }         
 
 var The_move_Player=function(board){
       console.log(board,"before");
             $('.board-btns').on('click',function(){
                    var elem_row =event.target.id.slice(0,1)-0;
                    var elem_col =event.target.id.slice(2,3)-0;
                    //$('#NG').css({'display':'none'})
                 if(board[Conv(elem_row,elem_col)]===0){
                             var a ={row:elem_row,col:elem_col};  
                             Draw_move(a,P_type);
                             Choose(a,board,P_type);
                             //verificar
                             var v1=Verify(board);

                             if(v1.bool===true){
                                 var b=The_move_Comp(board,C_type);
                                 Draw_move(b,C_type);
                                 Choose(b,board,C_type);
                                 v2=Verify(board)
                                 if(v2.bool===false){
                                     console.log("estoy Infiltrao__1");
                                     if(v2.value===4){Player_counter++;}
                                     if(v2.value===1){Computer_counter++;}
                                     z=new_game();
                                     board=z.board;            ///aqui es la cosa , no se modifica nunca a board
                                 
                                 }
                                 
                             }
                            else{
                                    console.log("estoy Infiltrao__2");
                                   if(v1.value===4){Player_counter++;}
                                   if(v1.value===1){Computer_counter++;}
                                     z=new_game();
                                     board=z.board;            ///aqui es la cosa , no se modifica nunca a board
                                 }
                            return true;   
                            
                       }
                             else {
                         alert("I'm sorry,Someone took this position before"); 
                         
                         }
                   
     });
        
} 
 
 var Draw_move=function(a,type){
             if(type==='X'){
                 $('#'+a.row+'-'+a.col).html('<p>X</p>');
             }
             else{
                     $('#'+a.row+'-'+a.col).html('<p>O</p>');
                 }

         };
 
 var Choose=function(a,board,type)
 {
     var n=Conv(a.row,a.col);
     if(type==="X"){
         board[n]=4;
     }
     else{
         board[n]=1;
     }
 }
var Main=function(Currentboard){
     The_move_Player(Currentboard);
     
}



 
 return {
     Ini_Game:function(){
         var z=new_game();
         var Currentboard=z.board;
         console.log(Currentboard);
         Main(Currentboard);
        
         
     }
     }
 })();


 $(document).ready(function() {

     Run.Ini_Game();
 }); 


