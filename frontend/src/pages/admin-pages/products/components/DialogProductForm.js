import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {InputTextarea} from "primereact/inputtextarea";
import {RadioButton} from "primereact/radiobutton";
import React, {memo, useEffect, useState} from "react";
import {Button} from "primereact/button";
import * as categoryService from "~/services/CategoryService";


const DialogProductForm = ({
                               productDialog,
                               product,
                               onHideDialog,
                               submitted,
                               onChangeRadioCategory,
                               // onChangeInput,
                               onSaveProduct,
                               onChangeImage,
                               errorByName,
                               onBlurInputName
                           }) => {
    const [categories, setCategories] = useState([]);
    // const [curId, setCurId] = useState(null);
    // const [curName, setCurName] = useState('');
    // const [curDescription, setCurDescription] = useState('');
    // const [curCategory, setCurCategory] = useState({});
    // const [curImage, setCurImage] = useState('');

    console.log("Form re-render");
    useEffect(() => {
        // setCurId(product.id);
        // setCurName(product.name);
        // setCurDescription(product.description);
        // setCurCategory(product.category);
        // setCurImage(product.image);
        categoryService.getAll()
            .then((response) => setCategories(response.data))
            .catch((error) => console.log(error));
    }, []);

    const sendProduct = (product) => {
        // let newProduct = {
        //     id: curId,
        //     name: curName,
        //     description: curDescription,
        //     category: curCategory,
        //     image: curImage
        // };
        // [newProduct.id, newProduct.name, newProduct.description, newProduct.category, newProduct.image] = [curId, curName, curDescription, curCategory, curImage];
        onSaveProduct(product);
    }


    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={onHideDialog}/>
            <Button label="Save" icon="pi pi-check" onClick={() => sendProduct(product)}/>
        </React.Fragment>
    );
    //
    // function handleChangeName(e) {
    //     product.name = e.target.value;
    // }
    //
    // function handleChangeDescription(e) {
    //     product.description = e.target.value;
    // }
    //
    // function handleChangeCategory(e) {
    //     product.category = e.target.value;
    // }

    return (
        <Dialog visible={productDialog} style={{width: '70rem'}} breakpoints={{'960px': '75vw', '641px': '90vw'}}
                header={product.id ? "Product Detail" : "Create New Product"} modal className="p-fluid"
                footer={productDialogFooter} onHide={onHideDialog}>
            <div className="mt-4">
                <label className="bg-light h6 font-bold" htmlFor="inputGroupFile02">
                    {product.image ? "Choose other image" : "Choose image"}
                </label>
                <div className="input-group mb-3">
                    <input type="file" onChange={onChangeImage} accept="/image/*" className="form-control"
                           id="inputGroupFile02" multiple={false}/>
                </div>
                {
                    product.image && <img src={`${product.image}`} alt={product.image}
                                          className="product-image block m-auto pb-3"
                                          style={{width: '30rem'}}/>
                }

            </div>
            <div className="field">
                <label htmlFor="name" className="font-bold">
                    Name <sup style={{color: "red"}}>*</sup>
                </label>
                <InputText id="name" value={product.name}
                           className={classNames({'p-invalid': submitted && !product.name})} required
                           onBlur={onBlurInputName} maxLength={50}
                           title={"* Tên sản phẩm không được vượt quá 50 ký tự"}
                />
                <small className="p-error">{errorByName}</small>
                {submitted && !product.name && <small className="p-error">* Tên sản phẩm không được để trống!</small>}
            </div>
            <div className="field">
                <label htmlFor="description" className="font-bold">
                    Description
                </label>
                <InputTextarea id="description"
                               required rows={3} cols={20} value={product.description} maxLength={2000}
                               title={"* Mô tả sản phẩm không vượt quá 2000 ký tự."}
                />
            </div>

            <div className="field">
                <label className="mb-3 font-bold">Category</label>
                <div className="formgrid grid">
                    {categories.map((item) => (
                        <div className="field-radiobutton col-6" key={item.id}>
                            <RadioButton inputId={item.id} name="category" value={item}
                                         // onChange={handleChangeCategory}
                                         checked={product.category && product.category.id === item.id}
                            />
                            <label htmlFor={item.id}>{item.name}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/*<div className="formgrid grid">*/}
            {/*    <div className="field col">*/}
            {/*        <label htmlFor="price" className="font-bold">*/}
            {/*            Price*/}
            {/*        </label>*/}
            {/*        <InputNumber id="price" value={product.price}*/}
            {/*                     onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency"*/}
            {/*                     currency="USD" locale="en-US"/>*/}
            {/*    </div>*/}
            {/*    <div className="field col">*/}
            {/*        <label htmlFor="quantity" className="font-bold">*/}
            {/*            Quantity*/}
            {/*        </label>*/}
            {/*        <InputNumber id="quantity" value={product.quantity}*/}
            {/*                     onValueChange={(e) => onInputNumberChange(e, 'quantity')}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Dialog>
    );
};

export default memo(DialogProductForm);