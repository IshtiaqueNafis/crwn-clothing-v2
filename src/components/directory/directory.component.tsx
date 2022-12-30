import DirectoryItem from '../directory-item/directory-item.component';

import './directory.styles.scss';
import {categories} from "../../entity/models";


interface Props {
    categories: categories[];
}



const Directory = ({categories}:Props) => {
    return (
        <div className='directory-container'>
            {categories.map((category) => (
                <DirectoryItem key={category.title} category={category}/>
            ))}
        </div>
    );
};

export default Directory;