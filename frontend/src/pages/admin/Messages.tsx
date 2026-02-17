import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getContacts } from '@/lib/api';
import api from '@/lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Messages = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: contacts = [], isLoading } = useQuery({ 
    queryKey: ['contacts'], 
    queryFn: getContacts 
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/contact/${id}`).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast({ title: 'Deleted', description: 'Message removed successfully' });
    },
    onError: () => toast({ title: 'Error', description: 'Failed to delete message', variant: 'destructive' }),
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-display font-bold">Inbox</h2>

      <Card>
        <CardHeader>
          <CardTitle>Contact Inquiries ({contacts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading messages...</div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No messages yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Service / Subject</TableHead>
                  <TableHead className="w-[35%]">Message</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact: any) => (
                  <TableRow key={contact._id}>
                    <TableCell className="whitespace-nowrap text-muted-foreground text-sm">
                      {new Date(contact.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="font-medium">
                      {contact.fullName}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <span>{contact.email}</span>
                        <span className="text-muted-foreground">{contact.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{contact.subject || 'No Subject'}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="whitespace-pre-wrap max-h-24 overflow-y-auto">
                        {contact.message || <span className="text-muted-foreground italic">No message</span>}
                      </div>
                      {contact.resumeLink && (
                        <div className="mt-2 text-xs text-blue-500 font-medium">
                          Resume: <a href={contact.resumeLink} target="_blank" rel="noopener noreferrer" className="underline">{contact.resumeLink}</a>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(contact._id)}
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;