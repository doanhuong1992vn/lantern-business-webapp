import React, {useContext, useEffect, useRef, useState} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Image} from 'primereact/image';
import {Toolbar} from 'primereact/toolbar';
import {RadioButton} from 'primereact/radiobutton';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import storage from "~/firebaseConfig";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";


import * as productService from '~/services/productService'
import * as categoryService from "~/services/categoryService";
import {useNavigate} from "react-router-dom";
import AuthContext from "~/security/AuthContext";
import * as sizeService from "~/services/sizeService";
import * as colorService from "~/services/colorService";
import {Checkbox} from "primereact/checkbox";
import {MDBBtn, MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import {Editor} from "primereact/editor";
import {InputNumber} from "primereact/inputnumber";

const Products = () => {
    let newProduct = {
        name: '',
        image: null,
        description: '',
        category: '',
        isShow: true,
        variants: []
    };
    const [file, setFile] = useState('');
    const [errorByName, setErrorByName] = useState('');
    const [description, setDescription] = useState('');
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productList, setProductList] = useState([]);
    const [checkedSizes, setCheckedSizes] = useState([]);
    const [checkedColors, setCheckedColors] = useState([]);
    const [product, setProduct] = useState({...newProduct});
    const [submitted, setSubmitted] = useState(false);
    const [productDialog, setProductDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(false);
    const [deleteVariantDialog, setDeleteVariantDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductListDialog, setDeleteProductListDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedProductList, setSelectedProductList] = useState(null);
    const [variant, setVariant] = useState({});


    const toast = useRef(null);
    const dt = useRef(null);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate("/error-403");
        } else {
            productService.getAll(user.token)
                .then(response => setProductList(response.data))
                .catch(err => console.log(err));
            categoryService.getAll(user.token)
                .then(response => setCategories(response.data))
                .catch(err => console.log(err));
            sizeService.getAll(user.token)
                .then(response => setSizes(response.data))
                .catch(err => console.log(err));
            colorService.getAll(user.token)
                .then(response => setColors(response.data))
                .catch(err => console.log(err));
        }
    }, [user, navigate]);

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const handleOpenNewProductDialog = () => {
        setSelectedCategory(false);
        setProduct(newProduct);
        setCheckedColors([]);
        setCheckedSizes([]);
        setSubmitted(false);
        setProductDialog(true);
    };

    const handleOpenEditProductDialog = (product) => {
        setSelectedCategory(true);
        productService.findById(product.id, user.token)
            .then(response => {
                setProduct(response.data);
                setDescription(response.data.description);
                const _variants = response.data.variants;
                const _checkedSizes = [];
                const _checkedColors = [];
                _variants.forEach(variant => {
                    if (_checkedColors.every(item => item.color !== variant.color)) {
                        _checkedColors.push({color: variant.color});
                    }
                    if (_checkedSizes.every(item => item.size !== variant.size)) {
                        _checkedSizes.push({size: variant.size, variants: [{...variant}]});
                    } else {
                        _checkedSizes.find(item => item.size === variant.size).variants.push(variant);
                    }
                });
                setCheckedColors(_checkedColors);
                setCheckedSizes(_checkedSizes);
            })
            .catch(err => console.log(err))
        setProductDialog(true);
    };

    const handleHideProductDialog = () => {
        setErrorByName('');
        setSubmitted(false);
        setProductDialog(false);
    };

    const handleChangeImage = (event) => {
        setFile(event.target.files[0]);
    }

    const handleChangeProductInput = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = {...product};
        _product[`${name}`] = val;
        setProduct(_product);
    };

    const handleBlurInputName = (e) => {
        console.log(product)
        setErrorByName('');
        const nameIsValid = productList
            ? productList.some((item) => (item.name === e.target.value) && (item.id !== product.id))
            : false;
        if (nameIsValid) {
            setErrorByName("* Tên sản phẩm đã tồn tại");
        }
        if (e.target.value === '') {
            setErrorByName("* Tên sản phẩm không được để trống");
        }
    }
    const handleChangeEditor = (htmlValue) => {
        setDescription(htmlValue);
    }

    const handleChangeRadioCategory = (e) => {
        setSelectedCategory(true);
        let _product = {...product};
        _product['category'] = e.value.category;
        setProduct(_product);
    };

    const handleChangeSize = (e) => {
        if (e.target.checked) {
            const sizeData = {
                size: e.target.value,
                variants: checkedColors.map(item => ({...item}))
            };
            setCheckedSizes([...checkedSizes, sizeData]);
        } else {
            setCheckedSizes(checkedSizes.filter((item) => item.size !== e.target.value));
        }
    }

    const handleChangeColor = (e) => {
        if (e.target.checked) {
            const variant = {
                id: null,
                color: e.target.value,
                quantity: null,
                importPrice: null,
                salePrice: null,
            }
            checkedColors.push({...variant});
            setCheckedColors(checkedColors);
            setCheckedSizes(checkedSizes.map((item) => {
                item.variants.push({...variant, size: item.size})
                return item;
            }));
        } else {
            setCheckedColors(checkedColors.filter(({color}) => color !== e.target.value));
            setCheckedSizes(checkedSizes.map((item) => {
                item.variants = item.variants.filter(({color}) => color !== e.target.value);
                return item;
            }));
        }
    }

    const handleChangeVariantInput = (e, indexSize, indexVariant, field) => {
        setCheckedSizes(checkedSizes.map((item, indexColumn) => {
            if (indexColumn === indexSize) {
                item.variants?.map((variant, indexRow) => {
                    if (indexRow === indexVariant) {
                        variant[field] = e.value;
                    }
                    return variant;
                })
            }
            return item;
        }));
    }

    const handleShowDeleteVariantDialog = (indexSize, indexVariant) => {
        setVariant(
            checkedSizes
                .find((item, indexColumn) => indexColumn === indexSize)
                .variants.find((item, indexRow) => indexRow === indexVariant)
        );
        setDeleteVariantDialog(true);
    };

    const handleHideDeleteVariantDialog = () => {
        setDeleteVariantDialog(false);
    };

    const handleDeleteVariant = () => {
        setCheckedSizes(checkedSizes.map(item => {
            item.variants = item.variants.filter(item => item !== variant);
            return item;
        }));
        setDeleteVariantDialog(false);
    }

    const handleSaveProduct = () => {
        setSubmitted(true);
        if (errorByName || !selectedCategory) {
            return;
        }
        if (product.name.trim()) {
            let _productList = [...productList];
            let _product = {...product};
            const variants = [];
            checkedSizes.forEach(item => {item.variants.forEach(variant => variants.push(variant))});
            _product.variants = variants;
            _product.description = description;
            if (file) {
                const storageRef = ref(storage, `/files/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                    },
                    (err) => console.log(err),
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            _product.image = url;
                            if (_product.id) {
                                updateProduct(_product, _productList);
                            } else {
                                saveProduct(_product, _productList);
                            }
                        });
                    }
                );
            } else {
                if (_product.id) {
                    updateProduct(_product, _productList);
                } else {
                    saveProduct(_product, _productList);
                }
            }
            setProduct(newProduct);
            setProductList(_productList);
            setFile(null);
            setDescription('');
            setCheckedSizes([]);
            setCheckedColors([]);
            setProductDialog(false);
        }
    };

    function saveProduct(_product, _productList) {
        productService.save(_product, user.token)
            .then((response) => {
                setProduct(response.data)
                _productList.unshift(response.data);
                toast.current.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
            })
            .catch((error) => console.log(error));
    }

    function updateProduct(_product, _productList) {
        productService.update(_product, user.token)
            .then((response) => {
                setProduct(response.data)
                const index = findIndexById(product.id);
                _productList[index] = response.data;
                toast.current.show({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            })
            .catch((error) => console.log(error));
    }

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

    const handleHideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const handleConfirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const handleDeleteProduct = () => {
        productService.deleteById(product.id, user.token).then().catch(err => console.log(err));
        let _products = productList.filter((val) => val.id !== product.id);
        setProductList(_products);
        setDeleteProductDialog(false);
        setProduct(newProduct);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    };

    const handleChangeProductsSelected = (e) => {
        setSelectedProductList(e.value);
    }

    const handleConfirmDeleteProductsSelected = () => {
        setDeleteProductListDialog(true);
    };

    const handleHideDeleteProductListDialog = () => {
        setDeleteProductListDialog(false);
    };

    const handleDeleteSelectedProducts = () => {
        let ids = [];
        selectedProductList.map(item => ids.push(item.id));
        console.log(ids);
        productService.deleteByIds(ids, user.token);
        let _products = productList.filter((val) => !selectedProductList.includes(val));
        setProductList(_products);
        setDeleteProductListDialog(false);
        setSelectedProductList(null);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={handleOpenNewProductDialog}/>
                <Button label="Delete" icon="pi pi-trash" severity="danger"
                        onClick={handleConfirmDeleteProductsSelected}
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

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2"
                        onClick={() => handleOpenEditProductDialog(rowData)}/>
                <Button icon="pi pi-trash" rounded outlined severity="danger"
                        onClick={() => handleConfirmDeleteProduct(rowData)}/>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    const productDialogFooter = (
        <div className="mt-5">
            <Button label="Cancel" icon="pi pi-times" outlined onClick={handleHideProductDialog}/>
            <Button label="Save" icon="pi pi-check" onClick={handleSaveProduct}/>
        </div>
    );
    const deleteVariantDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={handleHideDeleteVariantDialog}/>
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={handleDeleteVariant}/>
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={handleHideDeleteProductDialog}/>
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={handleDeleteProduct}/>
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={handleHideDeleteProductListDialog}/>
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={handleDeleteSelectedProducts}/>
        </React.Fragment>
    );

    return (
        <div className="m-3">
            <Toast ref={toast}/>
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt}
                           value={productList}
                           selection={selectedProductList}
                           onSelectionChange={handleChangeProductsSelected}
                           dataKey="id"
                           paginator
                           rows={10}
                           rowsPerPageOptions={[5, 10, 25]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink
                            LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                           globalFilter={globalFilter}
                           header={header}>
                    <Column selectionMode="multiple" exportable={true}></Column>
                    <Column field="name" header="Name" sortable style={{minWidth: '16rem'}}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="category" header="Category" sortable style={{minWidth: '10rem'}}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{minWidth: '12rem'}}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog}
                    style={{width: '70rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}}
                    header={product.id ? "Product Detail" : "Create New Product"}
                    modal
                    className="p-fluid"
                    footer={productDialogFooter}
                    onHide={handleHideProductDialog}
            >
                <div className="p-1 mb-5">
                    <div className="mt-4">
                        <label className="bg-light h6 font-bold" htmlFor="inputGroupFile02">
                            {product.image ? "Choose other image" : "Choose image"}
                        </label>
                        <div className="input-group mb-3">
                            <input type="file"
                                   onChange={handleChangeImage}
                                   accept="/image/*"
                                   className="form-control"
                                   id="inputGroupFile02"/>
                        </div>
                        {
                            product.image && <img src={`${product.image}`}
                                                  alt={product.name}
                                                  className="product-image block m-auto pb-3"
                                                  style={{width: '30rem'}}/>
                        }

                    </div>

                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                            Name <sup style={{color: "red"}}>*</sup>
                        </label>
                        <InputText
                            id="name"
                            value={product.name}
                            onChange={(e) => handleChangeProductInput(e, 'name')}
                            className={classNames({'p-invalid': submitted && !product.name})}
                            required
                            onBlur={handleBlurInputName}
                            maxLength={50}
                            title={"Tên sản phẩm không được vượt quá 50 ký tự"}
                        />
                        <small className="p-error">{
                            errorByName || (submitted && !product.name && "* Tên sản phẩm không được để trống!")
                        }</small>
                    </div>

                    <div className="field">
                        <label className="font-bold">
                            Description
                        </label>
                        <Editor value={description}
                                onTextChange={(e) => handleChangeEditor(e.htmlValue)}
                                style={{height: '50vh'}}/>
                    </div>

                    <div className="field">
                        <label className="font-bold">
                            Category <sup style={{color: "red"}}>*</sup>
                        </label>
                        {
                            submitted && !selectedCategory &&
                            <div>
                                <small className="p-error">* Vui lòng chọn danh mục cho sản phẩm!</small>
                            </div>
                        }
                        <div className="formgrid grid">
                            {categories.map((category) => (
                                <div className="field-radiobutton col-6 mt-3" key={category.id}>
                                    <RadioButton inputId={category.id}
                                                 name="category"
                                                 value={category}
                                                 onChange={handleChangeRadioCategory}
                                                 checked={product.category === category.category}
                                                 required={true}
                                    />
                                    <label htmlFor={category.id}>{category.category}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="field">
                        <div className="formgrid grid">
                            <div className="field col">
                                <label className="font-bold">
                                    Size
                                </label>
                                {sizes.map(({size}) => (
                                    <div className="field-radiobutton col-6 mt-3" key={size}>
                                        <Checkbox inputId={size}
                                                  name="size"
                                                  value={size}
                                                  onChange={handleChangeSize}
                                                  checked={checkedSizes.some(current => current.size === size)}
                                        />
                                        <label htmlFor={size}>{size}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="field col">
                                <label className="font-bold">
                                    Color
                                </label>
                                {colors.map(({color}) => (
                                    <div className="field-radiobutton col-6 mt-3" key={color}>
                                        <Checkbox inputId={color}
                                                  name="size"
                                                  value={color}
                                                  onChange={handleChangeColor}
                                                  checked={checkedColors.some(current => current.color === color)}
                                        />
                                        <label htmlFor={color}>{color}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <div className="formgrid grid">
                            {checkedSizes.length !== 0 && checkedColors.length !== 0 &&
                                <MDBTable align="middle">
                                    <MDBTableHead align="middle">
                                        <tr>
                                            <th scope="col">Size</th>
                                            <th scope="col">Color</th>
                                            <th scope="col">Import Price</th>
                                            <th scope="col">Sale Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody align="middle">
                                        {checkedSizes && checkedSizes.map(({size, variants}, indexSize) => (
                                            <>
                                                <tr className="pb-3" key={indexSize}>
                                                    {variants.length
                                                        ? <td rowSpan={variants.length}>{size}</td>
                                                        : <td>{size}</td>}
                                                    <td>{variants && variants[0]?.color}</td>
                                                    <td>
                                                        {variants && variants.length !== 0 &&
                                                            <InputNumber
                                                                onChange={e => handleChangeVariantInput(
                                                                    e, indexSize, 0, "importPrice"
                                                                )}
                                                                value={variants && variants[0]?.importPrice}
                                                                min={0}
                                                                mode="currency"
                                                                currency="VND"
                                                                locale="vi-VN"
                                                                placeholder='Nhập giá mua vào'
                                                            />}
                                                    </td>
                                                    <td>
                                                        {variants && variants.length !== 0 &&
                                                            <InputNumber
                                                                onChange={e => handleChangeVariantInput(
                                                                    e, indexSize, 0, "salePrice"
                                                                )}
                                                                value={variants && variants[0]?.salePrice}
                                                                min={0}
                                                                mode="currency"
                                                                currency="VND"
                                                                locale="vi-VN"
                                                                placeholder='Nhập giá bán ra'
                                                            />}
                                                    </td>
                                                    <td>
                                                        {variants && variants.length !== 0 &&
                                                            <InputNumber
                                                                onChange={e => handleChangeVariantInput(
                                                                    e, indexSize, 0, "quantity"
                                                                )}
                                                                value={variants && variants[0]?.quantity}
                                                                min={0}
                                                                placeholder='Nhập số lượng'
                                                            />}
                                                    </td>
                                                    <td>
                                                        {variants && variants.length !== 0 &&
                                                            <MDBBtn
                                                                className="btn-close"
                                                                color="none"
                                                                aria-label="Close"
                                                                onClick={() =>
                                                                    handleShowDeleteVariantDialog(indexSize, 0)}
                                                            />}
                                                    </td>
                                                </tr>
                                                {variants && variants.map(({
                                                                               color,
                                                                               importPrice,
                                                                               salePrice,
                                                                               quantity
                                                                           }, indexVariant) => {
                                                    return <>{indexVariant !== 0 &&
                                                        <tr className="pb-3" key={indexVariant}>
                                                            <td>{color}</td>
                                                            <td>
                                                                <InputNumber
                                                                    onChange={e => handleChangeVariantInput(
                                                                        e, indexSize, indexVariant, "importPrice"
                                                                    )}
                                                                    value={importPrice}
                                                                    min={0}
                                                                    mode="currency"
                                                                    currency="VND"
                                                                    locale="vi-VN"
                                                                    placeholder='Nhập giá mua vào'
                                                                />
                                                            </td>
                                                            <td>
                                                                <InputNumber
                                                                    onChange={e => handleChangeVariantInput(
                                                                        e, indexSize, indexVariant, "salePrice"
                                                                    )}
                                                                    value={salePrice}
                                                                    min={0}
                                                                    mode="currency"
                                                                    currency="VND"
                                                                    locale="vi-VN"
                                                                    placeholder='Nhập giá bán ra'
                                                                />
                                                            </td>
                                                            <td>
                                                                <InputNumber
                                                                    onChange={e => handleChangeVariantInput(
                                                                        e, indexSize, indexVariant, "quantity"
                                                                    )}
                                                                    value={quantity}
                                                                    min={0}
                                                                    placeholder='Nhập số lượng'
                                                                />
                                                            </td>
                                                            <td>
                                                                <MDBBtn className="btn-close"
                                                                        color="none"
                                                                        aria-label="Close"
                                                                        onClick={() => handleShowDeleteVariantDialog(
                                                                            indexSize, indexVariant
                                                                        )}
                                                                />
                                                            </td>
                                                        </tr>}
                                                    </>
                                                })}
                                            </>
                                        ))}
                                    </MDBTableBody>
                                </MDBTable>
                            }
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteVariantDialog} style={{width: '32rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
                    footer={deleteVariantDialogFooter} onHide={handleHideDeleteVariantDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {variant && product && (
                        <span>
                            Bạn có chắc chắn muốn xóa size <b>{variant.size}</b> màu <b>{variant.color}</b> của sản phẩm <b>{product.name || 'này'}</b> không?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{width: '32rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
                    footer={deleteProductDialogFooter} onHide={handleHideDeleteProductDialog}
            >
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
                    footer={deleteProductsDialogFooter} onHide={handleHideDeleteProductListDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default Products;
