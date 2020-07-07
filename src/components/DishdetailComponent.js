import React ,{Component} from 'react';
import {Card ,CardImg,CardImgOverlay,CardBody,CardText,CardTitle, Container,Breadcrumb,BreadcrumbItem,
     Button ,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input,Row,Col} from 'reactstrap'
import {Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values){
      this.toggleModal();
      this.props.postComment(this.props.dishID,values.rating,values.author,values.comment)
    }
    render(){
        return(
            <div>
           <Button outline onClick={this.toggleModal}>
               <span className="fa fa-pencil fa-lg"></span> Submit Comment
           </Button>  
           
           <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>  
                                    </Control.select>
                                </Col>
                            </Row>
                    <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="name" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            
                            <Row className="form-group">
                                <Label htmlFor="message" md={12}>Comments</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="message" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                            </LocalForm>          
                    </ModalBody>
                </Modal>
                </div>
        )
    }
}


   function  RenderDish({dish}){
    
        return(
               <Card>
                   <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
        );
        
    }
   function RenderComments({comments,postComment,dishID}){
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
                    <CommentForm dishID={dishID} postComment={postComment}></CommentForm>
                </ul>

            </div>
        )
    }
    const DishDetail =(props)=>{ 
            if (props.isLoading) {
                return(
                    <div className="container">
                        <div className="row">            
                            <Loading />
                        </div>
                    </div>
                );
            }
            else if (props.errMess) {
                return(
                    <div className="container">
                        <div className="row">            
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                );
            }
            else if (props.dish != null) 
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
                      <RenderComments comments={props.comments} 
                      postComment={props.postComment}  dishID={props.dish.id}/>
                     
              </div>        
            </div>

            </div>

        )
    }





export default DishDetail;
  