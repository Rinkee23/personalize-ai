import { useState } from "react"
import { Button } from "../components/ui/Button.tsx"
import { Card, CardContent } from "../components/ui/Card.tsx"
import { Input } from "../components/ui/Input.tsx"
import { Modal } from "../components/ui/Modal.tsx"
import { Badge } from "../components/ui/Badge.tsx"
import { Select } from "../components/ui/Select.tsx"
import { Textarea } from "../components/ui/Textarea.tsx"
import { useQueryMock } from "../hooks/useMockData.ts"
import type { Product } from "../services/mockData.ts"

const categories = ["Electronics", "Sports", "Fashion", "Books", "Home", "Beauty", "Accessories"]

export default function Products() {
  const { data: products = [], isLoading } = useQueryMock<Product[]>({
    queryKey: ["products"],
  })
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formName, setFormName] = useState("")
  const [formCategory, setFormCategory] = useState("")
  const [formPrice, setFormPrice] = useState("")
  const [formDescription, setFormDescription] = useState("")

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !categoryFilter || p.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const openAdd = () => {
    setEditingProduct(null)
    setFormName("")
    setFormCategory("")
    setFormPrice("")
    setFormDescription("")
    setShowModal(true)
  }

  const openEdit = (product: Product) => {
    setEditingProduct(product)
    setFormName(product.name)
    setFormCategory(product.category)
    setFormPrice(String(product.price))
    setFormDescription(product.description)
    setShowModal(true)
  }

  const handleSave = () => {
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Products</h1>
        <Button onClick={openAdd}>Add Product</Button>
      </div>

      <Card>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <Select
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={[{ value: "", label: "All Categories" }, ...categories.map((c) => ({ value: c, label: c }))]}
              placeholder="Filter by category"
              className="max-w-xs"
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <div className="flex h-40 items-center justify-center rounded-lg bg-muted">
                <span className="text-4xl">{product.category === "Electronics" ? "💻" : product.category === "Sports" ? "⚽" : product.category === "Fashion" ? "👗" : product.category === "Books" ? "📚" : product.category === "Home" ? "🏠" : product.category === "Beauty" ? "💄" : "📦"}</span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <Badge variant={product.inStock ? "success" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEdit(product)}>
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Rating: {product.rating}</span>
                  <span>|</span>
                  <span>Sales: {product.sales}</span>
                </div>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">No products found</div>
          )}
        </div>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingProduct ? "Edit Product" : "Add Product"}
        footer={
          <>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>{editingProduct ? "Save" : "Add"}</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Product name" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Category</label>
            <Select
              value={formCategory}
              onChange={setFormCategory}
              options={categories.map((c) => ({ value: c, label: c }))}
              placeholder="Select category"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Price</label>
            <Input type="number" value={formPrice} onChange={(e) => setFormPrice(e.target.value)} placeholder="0.00" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <Textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder="Product description" />
          </div>
        </div>
      </Modal>
    </div>
  )
}
