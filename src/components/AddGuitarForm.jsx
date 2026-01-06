import React, { useState } from 'react';

const AddGuitarForm = ({ onAddGuitar }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    type: '',
    brand: '',
    image: '',
    rating: '',
    reviews: '',
    features: '',
    inStock: true,
    badge: '',
    maxStock: '',
    delivery: '',
    specifications: '',
    description: '',
    warranty: '',
    sku: '',
    images: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const guitar = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews, 10),
      maxStock: parseInt(formData.maxStock, 10),
      features: formData.features.split(','),
      specifications: JSON.parse(formData.specifications),
      images: formData.images.split(',')
    };
    onAddGuitar(guitar);
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      type: '',
      brand: '',
      image: '',
      rating: '',
      reviews: '',
      features: '',
      inStock: true,
      badge: '',
      maxStock: '',
      delivery: '',
      specifications: '',
      description: '',
      warranty: '',
      sku: '',
      images: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Ajouter une Guitare</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom de la guitare"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Prix"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="originalPrice"
          value={formData.originalPrice}
          onChange={handleChange}
          placeholder="Prix original"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type (électrique, acoustique, etc.)"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Marque"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="URL de l'image principale"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Note (1-5)"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="reviews"
          value={formData.reviews}
          onChange={handleChange}
          placeholder="Nombre d'avis"
          className="border p-2 rounded"
        />
        <textarea
          name="features"
          value={formData.features}
          onChange={handleChange}
          placeholder="Caractéristiques (séparées par des virgules)"
          className="border p-2 rounded"
        ></textarea>
        <textarea
          name="specifications"
          value={formData.specifications}
          onChange={handleChange}
          placeholder="Spécifications (JSON)"
          className="border p-2 rounded"
        ></textarea>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
        ></textarea>
        <input
          type="text"
          name="badge"
          value={formData.badge}
          onChange={handleChange}
          placeholder="Badge (optionnel)"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="maxStock"
          value={formData.maxStock}
          onChange={handleChange}
          placeholder="Stock maximum"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="delivery"
          value={formData.delivery}
          onChange={handleChange}
          placeholder="Livraison"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="warranty"
          value={formData.warranty}
          onChange={handleChange}
          placeholder="Garantie"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          placeholder="SKU"
          className="border p-2 rounded"
        />
        <textarea
          name="images"
          value={formData.images}
          onChange={handleChange}
          placeholder="Images (URLs séparées par des virgules)"
          className="border p-2 rounded"
        ></textarea>
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Ajouter la guitare
      </button>
    </form>
  );
};

export default AddGuitarForm;