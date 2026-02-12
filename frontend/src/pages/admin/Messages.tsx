import { useQuery } from '@tanstack/react-query';
import { getContacts } from '@/lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns'; // Make sure to npm install date-fns if needed, or use JS Date

const Messages = () => {
  const { data: contacts = [], isLoading } = useQuery({ 
    queryKey: ['contacts'], 
    queryFn: getContacts 
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-display font-bold">Inbox</h2>

      <Card>
        <CardHeader>
          <CardTitle>Contact Inquiries & Applications</CardTitle>
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
                  <TableHead>Subject</TableHead>
                  <TableHead className="w-[40%]">Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact: any) => (
                  <TableRow key={contact._id}>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {new Date(contact.createdAt).toLocaleDateString()}
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
                        {contact.message}
                      </div>
                      {contact.resumeLink && (
                        <div className="mt-2 text-xs text-blue-500 font-medium">
                          Resume Link: {contact.resumeLink}
                        </div>
                      )}
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