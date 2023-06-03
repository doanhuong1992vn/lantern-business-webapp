import React, {useEffect, useRef, useState} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Image} from 'primereact/image';
import {Toolbar} from 'primereact/toolbar';
import {InputTextarea} from 'primereact/inputtextarea';
import {RadioButton} from 'primereact/radiobutton';
import {InputNumber} from 'primereact/inputnumber';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import storage from "~/firebaseConfig";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";


import * as productService from '~/services/ProductService'
import * as categoryService from "~/services/CategoryService";

const Products = () => {
    console.log("products re-render")
    let newProduct = {
        name: '',
        image: '',
        description: '',
        category: {},
    };
    const [file, setFile] = useState("");
    const [productList, setProductList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductListDialog, setDeleteProductListDialog] = useState(false);
    const [product, setProduct] = useState(newProduct);
    const [selectedProductList, setSelectedProductList] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [url, setUrl] = useState('');
    const [errorByName, setErrorByName] = useState('');


    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        productService.getAll()
            .then((response) => setProductList(response.data))
            .catch((error) => console.log(error));
        categoryService.getAll()
            .then((response) => setCategories(response.data))
            .catch((error) => console.log(error));
    }, []);

    // const formatCurrency = (value) => {
    //     return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    // };

    const handleChangeImage = (event) => {
        setFile(event.target.files[0]);
    }

    const openNew = () => {
        setProduct(newProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setErrorByName('');
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductListDialog = () => {
        setDeleteProductListDialog(false);
    };

    const saveProduct = () => {
        if (errorByName) {
            return;
        }
        setSubmitted(true);

        if (product.name.trim()) {
            let _productList = [...productList];
            let _product = {...product};

            if (product.id) {
                const index = findIndexById(product.id);

                _productList[index] = _product;
                toast.current.show({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            } else {
                const storageRef = ref(storage, `/files/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // const percent = Math.round(
                        //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        // );
                    },
                    (err) => console.log(err),
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            console.log(url);
                            // setUrl(url);
                            _product.image = url;
                            productService.save(_product)
                                .then((response) => setProduct(response.data))
                                .catch((error) => console.log(error));
                            _productList.unshift(_product);
                            toast.current.show({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
                        });
                    }
                );
            }
            setProductList(_productList);
            setProductDialog(false);
            setProduct(newProduct);
        }
    };

    const editProduct = (product) => {
        setProduct({...product});
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = productList.filter((val) => val.id !== product.id);

        setProductList(_products);
        setDeleteProductDialog(false);
        setProduct(newProduct);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < productList.length; i++) {
            if (productList[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductListDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = productList.filter((val) => !selectedProductList.includes(val));

        setProductList(_products);
        setDeleteProductListDialog(false);
        setSelectedProductList(null);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    };

    const handleOnChangeRadioCategory = (e) => {
        let _product = {...product};
        _product['category'] = e.value;
        setProduct(_product);
    };

    const handleOnChangeInput = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = {...product};

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = {...product};

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew}/>
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}
                        disabled={!selectedProductList || !selectedProductList.length}/>
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV}/>;
    };

    const imageBodyTemplate = (rowData) => {
        return <Image src={`${rowData.image}`} zoomSrc={`${rowData.image}`} alt={rowData.name} width="80" height="80"
                      preview/>;
    };

    // const priceBodyTemplate = (rowData) => {
    //     return formatCurrency(rowData.price);
    // };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)}/>
                <Button icon="pi pi-trash" rounded outlined severity="danger"
                        onClick={() => confirmDeleteProduct(rowData)}/>
            </React.Fragment>
        );
    };


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..."/>
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog}/>
            <Button label="Save" icon="pi pi-check" onClick={saveProduct}/>
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog}/>
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct}/>
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductListDialog}/>
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts}/>
        </React.Fragment>
    );

    function handleBlurInputName(e) {
        setErrorByName('');
        if (e.target.value.length > 50) {
            setErrorByName("* Tên sản phẩm không được vượt quá 50 ký tự")
        }
        const nameIsValid = productList.some((product) => product.name === e.target.value && product.id)
        if (nameIsValid) {
            setErrorByName("* Tên sản phẩm đã tồn tại");
        }
        if (e.target.value === '') {
            setErrorByName("* Tên sản phẩm không được để trống");
        }
    }

    return (
        <div>
            <Toast ref={toast}/>
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={productList} selection={selectedProductList}
                           onSelectionChange={(e) => setSelectedProductList(e.value)}
                           dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                           globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="name" header="Name" sortable style={{minWidth: '16rem'}}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="category.name" header="Category" sortable style={{minWidth: '10rem'}}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{minWidth: '12rem'}}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{width: '70rem'}} breakpoints={{'960px': '75vw', '641px': '90vw'}}
                    header={product.id ? "Product Detail" : "Create New Product"} modal className="p-fluid"
                    footer={productDialogFooter} onHide={hideDialog}>
                <div className="mt-4">
                    <label className="bg-light h6 font-bold" htmlFor="inputGroupFile02">
                        {product.image ? "Choose other image" : "Choose image"}
                    </label>
                    <div className="input-group mb-3">
                        <input type="file" onChange={handleChangeImage} accept="/image/*" className="form-control"
                               id="inputGroupFile02"/>
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
                    <InputText id="name" value={product.name} onChange={(e) => handleOnChangeInput(e, 'name')}
                               className={classNames({'p-invalid': submitted && !product.name})} required
                               onBlur={handleBlurInputName} maxLength={50}
                               title={"* Tên sản phẩm không được vượt quá 50 ký tự"}
                    />
                    <small className="p-error">{errorByName}</small>
                    {submitted && !product.name && <small className="p-error">* Tên sản phẩm không được để trống!</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" onChange={(e) => handleOnChangeInput(e, 'description')}
                                    required rows={3} cols={20} value={product.description} maxLength={2000}
                                   title={"* Mô tả sản phẩm không vượt quá 2000 ký tự."}
                    />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        {categories.map((category) => (
                            <div className="field-radiobutton col-6" key={category.id}>
                                <RadioButton inputId={category.id} name="category" value={category}
                                             onChange={handleOnChangeRadioCategory}
                                             checked={product.category.id === category.id}
                                             required={true}
                                />
                                <label htmlFor={category.id}>{category.name}</label>
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

            <Dialog visible={deleteProductDialog} style={{width: '32rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
                    footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductListDialog} style={{width: '32rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
                    footer={deleteProductsDialogFooter} onHide={hideDeleteProductListDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default Products;
