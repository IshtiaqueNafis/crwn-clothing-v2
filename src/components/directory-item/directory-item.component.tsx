import './directory-item.styles.scss'
import {Link} from "react-router-dom";
import {categories} from "../../entity/models";

interface Props {
   category:categories
}


const DirectoryItem = ({category}:Props) => {

    return (
        <div className='directory-item-container'>
            <div
                className='background-image'
                style={{
                    backgroundImage: `url(${category.imageUrl})`,
                }}
            />
            <div className='body'>
                <h2>{category.title.toUpperCase()}</h2>
                <Link to={`/shop/${category.title}`}>Shop Now</Link>
            </div>
        </div>
    );
};

export default DirectoryItem;
