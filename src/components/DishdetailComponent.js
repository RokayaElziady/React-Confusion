import React ,{Component} from 'react';
import {Card ,CardImg,CardImgOverlay,CardBody,CardText,CardTitle, Container,Breadcrumb,BreadcrumbItem} from 'reactstrap'
import {Link } from 'react-router-dom'
   function  RenderDish({dish}){
        if (dish != null)
        return(
               <Card>
                  <CardImg width="100%"  top src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
        );
        else
        return(
             <div></div>
        );
    }
   function RenderComments({comments}){
        if(Array.isArray(comments) && !comments.length){
            return (<div> </div>)
        }

        const comm = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}{","}{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit'}).format(new Date(comment.date))}</p>
                </li>
            )
        })

        return (
            <div>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {comm}
                </ul>

            </div>
        )
    }
    const DishDetail=(props)=>{
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
            <div className="row">

            <div  className="col-12 col-md-5 m-1">
                     <RenderDish dish={props.dish} />
              </div>

              <div className="col-12 col-md-5 m-1 ">
                      <RenderComments comments={props.comments} />
                     
              </div>


        
            </div>
            </div>

        )
    }



export default DishDetail;
  