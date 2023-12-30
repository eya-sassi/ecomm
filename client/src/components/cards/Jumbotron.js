export default function Jumbotron({title,subTitle='Empower Your Learning Journey' }){
    return( <div className="container-fluid jumbotron" >
       
        <div className='row'>
            <div className="col text-center p-5">
                <h1 className="fw-bold">{title}</h1>
                <p className="lead">{subTitle}</p>
            </div>
        </div>

    </div>
    );
}