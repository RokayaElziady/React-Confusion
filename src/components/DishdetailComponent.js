import React ,{Component} from 'react';
import {Card ,CardImg,CardImgOverlay,CardBody,CardText,CardTitle, Container,Breadcrumb,BreadcrumbItem,
     Button ,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input,Row,Col} from 'reactstrap'
import {Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    render(){
        return(
           <Button outline onClick={this.props.TM}>
               <span className="fa fa-pencil fa-lg"></span> Submit Comment
           </Button>              
        )
    }
}


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
   function RenderComments({comments, TM}){
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
                    <CommentForm TM={TM}></CommentForm>
                </ul>

            </div>
        )
    }
    class DishDetail extends Component{
        constructor(props){
            super(props);
            this.state ={
                isModalOpen: false
            };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }
  
        handleSubmit(event){
          this.toggleModal();
        //   alert("Username: " + this.username.value + " Password: " + this.password.value
        //       + " Remember: " + this.remember.checked);
        //  event.preventDefault();
        }


        render(){ 
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
            <div className="row">

            <div  className="col-12 col-md-5 m-1">
                     <RenderDish dish={this.props.dish} />
              </div>

              <div className="col-12 col-md-5 m-1 ">
                      <RenderComments comments={this.props.comments} TM={this.toggleModal} />
                     
              </div>


        
            </div>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                <Control.select model=".rate" name="rate"
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
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
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
                                    <Control.textarea model=".message" id="message" name="message"
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




export default DishDetail;
  