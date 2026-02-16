import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, 
  Edit, 
  Trash2, 
  BarChart3, 
  Zap, 
  Shield, 
  Rocket, 
  Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Icon Map for Display
const iconMap = {
  BarChart3: BarChart3,
  Zap: Zap,
  Shield: Shield,
  Rocket: Rocket,
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ProductsAdmin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form State - No pricing field
  const [formData, setFormData] = useState({
    icon: 'BarChart3',
    name: '',
    tagline: '',
    description: '',
    features: '', // comma separated string
    badge: ''
  });

  // Fetch Products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    }
  });

  // Mutations
  const createProduct = useMutation({
    mutationFn: async (newProduct: any) => {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(newProduct)
      });
      if (!res.ok) throw new Error('Failed to create product');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: "Success", description: "Product created successfully" });
    }
  });

  const updateProduct = useMutation({
    mutationFn: async (updatedProduct: any) => {
      const res = await fetch(`${API_URL}/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(updatedProduct)
      });
      if (!res.ok) throw new Error('Failed to update product');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: "Success", description: "Product updated successfully" });
    }
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete product');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: "Deleted", description: "Product removed" });
    }
  });

  // Helpers
  const resetForm = () => {
    setFormData({
      icon: 'BarChart3',
      name: '',
      tagline: '',
      description: '',
      features: '',
      badge: ''
    });
    setEditingProduct(null);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      icon: product.icon,
      name: product.name,
      tagline: product.tagline,
      description: product.description,
      features: product.features.join(', '),
      badge: product.badge || ''
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (editingProduct) {
      updateProduct.mutate(payload);
    } else {
      createProduct.mutate(payload);
    }
  };

  const IconDisplay = ({ iconName }: { iconName: string }) => {
    const Icon = iconMap[iconName as keyof typeof iconMap] || BarChart3;
    return <Icon className="w-5 h-5 text-primary" />;
  };

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <Card key={product._id} className="relative group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <IconDisplay iconName={product.icon} />
                </div>
                {product.badge && <Badge variant="secondary">{product.badge}</Badge>}
              </div>
              <CardTitle className="text-xl">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{product.tagline}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{product.description}</p>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground/80">Features:</p>
                <ul className="list-disc pl-4 text-xs text-muted-foreground">
                  {product.features.slice(0, 3).map((f: string, i: number) => (
                    <li key={i}>{f}</li>
                  ))}
                  {product.features.length > 3 && <li>+{product.features.length - 3} more...</li>}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                <Edit className="w-4 h-4 mr-2" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => { if(confirm('Delete this product?')) deleteProduct.mutate(product._id) }}>
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Icon</Label>
                <Select 
                  value={formData.icon} 
                  onValueChange={(val) => setFormData(prev => ({ ...prev, icon: val }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BarChart3">Bar Chart</SelectItem>
                    <SelectItem value="Zap">Zap (Lightning)</SelectItem>
                    <SelectItem value="Shield">Shield</SelectItem>
                    <SelectItem value="Rocket">Rocket</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Badge (Optional)</Label>
                <Input 
                  value={formData.badge} 
                  onChange={e => setFormData(prev => ({ ...prev, badge: e.target.value }))} 
                  placeholder="e.g. Most Popular" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input 
                required
                value={formData.name} 
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} 
              />
            </div>

            <div className="space-y-2">
              <Label>Tagline</Label>
              <Input 
                required
                value={formData.tagline} 
                onChange={e => setFormData(prev => ({ ...prev, tagline: e.target.value }))} 
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                required
                value={formData.description} 
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} 
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Features (comma separated)</Label>
              <Textarea 
                required
                value={formData.features} 
                onChange={e => setFormData(prev => ({ ...prev, features: e.target.value }))} 
                placeholder="Feature 1, Feature 2, Feature 3"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={createProduct.isPending || updateProduct.isPending}>
                {createProduct.isPending || updateProduct.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsAdmin;