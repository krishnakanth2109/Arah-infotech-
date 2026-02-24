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
  Loader2,
  AlertCircle
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
import { getProducts, createProduct as createProductApi, updateProduct as updateProductApi, deleteProduct as deleteProductApi } from '@/lib/api';

// Icon Map for Display
const iconMap = {
  BarChart3: BarChart3,
  Zap: Zap,
  Shield: Shield,
  Rocket: Rocket,
};

// ==========================================
// 🛡️ STRICT REGEX PATTERNS FOR VALIDATION
// ==========================================
const PATTERNS = {
  // Name: Only letters, numbers, spaces, hyphens, and ampersands
  NAME: /^[a-zA-Z0-9\s\-_&]+$/, 
  
  // Tagline: Alphanumeric + basic punctuation (.,!?)
  TAGLINE: /^[a-zA-Z0-9\s\-_.,!?&()]+$/, 
  
  // Description: No HTML tags (< >) to prevent XSS attacks
  DESCRIPTION_SAFE: /^[^<>]+$/, 
  
  // Feature (Per item): Alphanumeric + basic punctuation
  FEATURE: /^[a-zA-Z0-9\s\-_.,&]+$/, 
  
  // Badge: Strictly letters, numbers, and spaces
  BADGE: /^[a-zA-Z0-9\s]+$/, 
};

const ProductsAdmin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    icon: 'BarChart3',
    name: '',
    tagline: '',
    description: '',
    features: '', 
    badge: ''
  });

  // Validation Error State
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch Products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  // Mutations
  const createProduct = useMutation({
    mutationFn: (newProduct: any) => createProductApi(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      handleCloseDialog();
      toast({ title: "Success", description: "Product created successfully" });
    }
  });

  const updateProduct = useMutation({
    mutationFn: (updatedProduct: any) => updateProductApi(editingProduct._id, updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      handleCloseDialog();
      toast({ title: "Success", description: "Product updated successfully" });
    }
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => deleteProductApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: "Deleted", description: "Product removed" });
    }
  });

  // ==========================================
  // 🛡️ STRICT VALIDATION LOGIC
  // ==========================================
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 1. Icon Validation (Must be exactly one of the allowed keys)
    if (!Object.keys(iconMap).includes(formData.icon)) {
      newErrors.icon = "Invalid icon selected. Please choose from the list.";
    }

    // 2. Name Validation (Length: 3-50, Pattern: Alphanumeric + specific symbols)
    const nameTrimmed = formData.name.trim();
    if (nameTrimmed.length < 3 || nameTrimmed.length > 50) {
      newErrors.name = "Name must be between 3 and 50 characters long.";
    } else if (!PATTERNS.NAME.test(nameTrimmed)) {
      newErrors.name = "Name can only contain letters, numbers, spaces, hyphens, and '&'.";
    }

    // 3. Tagline Validation (Length: 5-120, Pattern: No weird symbols/HTML)
    const taglineTrimmed = formData.tagline.trim();
    if (taglineTrimmed.length < 5 || taglineTrimmed.length > 120) {
      newErrors.tagline = "Tagline must be between 5 and 120 characters long.";
    } else if (!PATTERNS.TAGLINE.test(taglineTrimmed)) {
      newErrors.tagline = "Tagline contains invalid characters. No HTML or special symbols allowed.";
    }

    // 4. Description Validation (Length: 20-1000, Pattern: No HTML '<' or '>')
    const descTrimmed = formData.description.trim();
    if (descTrimmed.length < 20 || descTrimmed.length > 1000) {
      newErrors.description = "Description must be detailed (between 20 and 1000 characters).";
    } else if (!PATTERNS.DESCRIPTION_SAFE.test(descTrimmed)) {
      newErrors.description = "Description cannot contain HTML brackets ('<' or '>') for security reasons.";
    }

    // 5. Features Validation (Array of strings, strict validation on EACH feature)
    const featuresTrimmed = formData.features.trim();
    if (featuresTrimmed.length === 0) {
      newErrors.features = "Please enter at least one feature.";
    } else {
      const featuresArray = featuresTrimmed.split(',').map(f => f.trim()).filter(Boolean);
      
      if (featuresArray.length === 0) {
        newErrors.features = "Invalid format. Separate features with commas.";
      } else {
        // Validate EVERY SINGLE feature in the comma-separated list
        const invalidFeature = featuresArray.find(
          f => f.length < 3 || f.length > 100 || !PATTERNS.FEATURE.test(f)
        );

        if (invalidFeature) {
          newErrors.features = `Invalid feature detected: "${invalidFeature}". Each feature must be 3-100 characters and contain no special symbols.`;
        }
      }
    }

    // 6. Badge Validation (Optional, but STRICT if provided)
    const badgeTrimmed = formData.badge.trim();
    if (badgeTrimmed.length > 0) {
      if (badgeTrimmed.length < 2 || badgeTrimmed.length > 20) {
        newErrors.badge = "Badge text must be between 2 and 20 characters.";
      } else if (!PATTERNS.BADGE.test(badgeTrimmed)) {
        newErrors.badge = "Badge can ONLY contain letters, numbers, and spaces.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helpers
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

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
    setErrors({});
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
    setErrors({});
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Run Validation
    if (!validateForm()) {
      toast({ 
        variant: "destructive", 
        title: "Validation Error", 
        description: "Please fix the highlighted errors before saving." 
      });
      return;
    }

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

  // Generic Change Handler to clear errors on typing
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
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
              <Button variant="destructive" size="sm" onClick={() => { if(confirm('Are you sure you want to delete this product?')) deleteProduct.mutate(product._id) }}>
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
              {/* Icon Selection */}
              <div className="space-y-2">
                <Label htmlFor="icon">Icon <span className="text-red-500">*</span></Label>
                <Select 
                  value={formData.icon} 
                  onValueChange={(val) => handleChange('icon', val)}
                >
                  <SelectTrigger className={errors.icon ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select Icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BarChart3">Bar Chart</SelectItem>
                    <SelectItem value="Zap">Zap (Lightning)</SelectItem>
                    <SelectItem value="Shield">Shield</SelectItem>
                    <SelectItem value="Rocket">Rocket</SelectItem>
                  </SelectContent>
                </Select>
                {errors.icon && <p className="text-xs text-red-500 mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.icon}</p>}
              </div>

              {/* Badge Input */}
              <div className="space-y-2">
                <Label htmlFor="badge">Badge (Optional)</Label>
                <Input 
                  id="badge"
                  value={formData.badge} 
                  onChange={e => handleChange('badge', e.target.value)}
                  placeholder="e.g. Popular" 
                  className={errors.badge ? "border-red-500" : ""}
                />
                {errors.badge && <p className="text-xs text-red-500 mt-1 flex items-start"><AlertCircle className="w-3 h-3 mr-1 mt-0.5 shrink-0"/>{errors.badge}</p>}
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Product Name <span className="text-red-500">*</span></Label>
              <Input 
                id="name"
                value={formData.name} 
                onChange={e => handleChange('name', e.target.value)}
                placeholder="e.g. Analytics Pro"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1 flex items-start"><AlertCircle className="w-3 h-3 mr-1 mt-0.5 shrink-0"/>{errors.name}</p>}
            </div>

            {/* Tagline Input */}
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline <span className="text-red-500">*</span></Label>
              <Input 
                id="tagline"
                value={formData.tagline} 
                onChange={e => handleChange('tagline', e.target.value)}
                placeholder="Brief catchy phrase"
                className={errors.tagline ? "border-red-500" : ""}
              />
              {errors.tagline && <p className="text-xs text-red-500 mt-1 flex items-start"><AlertCircle className="w-3 h-3 mr-1 mt-0.5 shrink-0"/>{errors.tagline}</p>}
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
              <Textarea 
                id="description"
                value={formData.description} 
                onChange={e => handleChange('description', e.target.value)}
                rows={4}
                placeholder="Detailed explanation of the product..."
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && <p className="text-xs text-red-500 mt-1 flex items-start"><AlertCircle className="w-3 h-3 mr-1 mt-0.5 shrink-0"/>{errors.description}</p>}
            </div>

            {/* Features Input */}
            <div className="space-y-2">
              <Label htmlFor="features">Features (comma separated) <span className="text-red-500">*</span></Label>
              <Textarea 
                id="features"
                value={formData.features} 
                onChange={e => handleChange('features', e.target.value)}
                placeholder="Real-time tracking, PDF Export, User Management"
                className={errors.features ? "border-red-500" : ""}
              />
              <p className="text-xs text-muted-foreground">Separate each feature with a comma.</p>
              {errors.features && <p className="text-xs text-red-500 mt-1 flex items-start"><AlertCircle className="w-3 h-3 mr-1 mt-0.5 shrink-0"/>{errors.features}</p>}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
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