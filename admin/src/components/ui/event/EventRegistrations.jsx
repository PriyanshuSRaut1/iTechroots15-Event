import React, { useState, useEffect } from 'react';
import { ref, onValue, query, orderByChild, update } from 'firebase/database';
import database from '../../../firebase';
import REACT_APP_BREVO_API_KEY from '../../../brevo';
import { Search, User, Users, Download, Eye } from 'lucide-react';

// ==================== APPROVAL EMAIL ====================
const approvalEmailTemplate = (registration) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Registration Approved - iTechroots 15.0</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 650px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.12);
    }
    .header {
      background: linear-gradient(135deg, #2e7d32, #66bb6a);
      color: white;
      padding: 25px;
      text-align: center;
      position: relative;
    }
    .header img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      position: absolute;
      top: 20px;
      left: 20px;
      border: 2px solid white;
    }
    .header h1 {
      margin: 0;
      font-size: 1.8em;
    }
    .event-subtitle {
      font-size: 0.9em;
      margin-top: 5px;
      opacity: 0.9;
    }
    .content {
      padding: 25px;
      color: #333333;
    }
    .content h3 {
      color: #2e7d32;
      margin-top: 20px;
    }
    .content ul {
      padding-left: 20px;
      margin: 10px 0;
    }
    .footer {
      margin-top: 20px;
      padding: 15px;
      font-size: 0.85em;
      text-align: center;
      color: #666;
      background-color: #f2f2f2;
    }
    a {
      color: #2e7d32;
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://res.cloudinary.com/da9aw7fkp/image/upload/v1755284276/itechroots_xwb6ko.jpg" alt="iTechroots Logo">
      <h1>Registration Approved</h1>
      <p class="event-subtitle">iTechroots 15.0</p>
    </div>
    <div class="content">
      <p>Dear ${registration.teamName || registration.members[0].name},</p>
      <p>We are delighted to confirm that your registration for <strong>iTechroots 15.0</strong> has been successfully <strong>approved</strong>.</p>
      <h3>Registration Details:</h3>
      <ul>
        <li><strong>Registration ID:</strong> ${registration.registrationId}</li>
        <li><strong>Event:</strong> ${registration.eventTitle}</li>
        <li><strong>Team Name:</strong> ${registration.teamName || 'Individual'}</li>
        <li><strong>Registration Type:</strong> ${registration.registrationType}</li>
        <li><strong>Paid Amount :</strong> ₹${registration.totalAmount || registration.amount || 'N/A'}</li>
        <li><strong>Transaction ID :</strong> ${registration.transactionId}</li>
      </ul>
      <p>We look forward to your active participation. Please keep this email for your records.</p>
    </div>
    <div class="footer">
      <p>This is an automated email — <strong>please do not reply</strong>.</p>
      <p>For assistance, visit our <a href="https://itechroots.in/contact-form">Contact Page</a>.</p>
    </div>
  </div>
</body>
</html>
`;


// ==================== REJECTION EMAIL ====================
const rejectionEmailTemplate = (registration) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Registration Not Approved - iTechroots 15.0</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 650px; margin: 40px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.12); }
    .header { background: linear-gradient(135deg, #c62828, #ef5350); color: white; padding: 25px; text-align: center; position: relative; }
    .header img { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; position: absolute; top: 20px; left: 20px; border: 2px solid white; }
    .header h1 { margin: 0; font-size: 1.8em; }
    .event-subtitle { font-size: 0.9em; margin-top: 5px; opacity: 0.9; }
    .content { padding: 25px; color: #333; }
    .content h3 { color: #c62828; margin-top: 20px; }
    .content ul { padding-left: 20px; margin: 10px 0; }
    .footer { margin-top: 20px; padding: 15px; font-size: 0.85em; text-align: center; color: #666; background-color: #f2f2f2; }
    a { color: #c62828; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://res.cloudinary.com/da9aw7fkp/image/upload/v1755284276/itechroots_xwb6ko.jpg" alt="iTechroots Logo">
      <h1>Registration Not Approved</h1>
      <p class="event-subtitle">iTechroots 15.0</p>
    </div>
    <div class="content">
      <p>Dear ${registration.teamName || registration.members[0].name},</p>
      <p>We regret to inform you that your registration for <strong>iTechroots 15.0</strong> has <strong>not been approved</strong>.</p>
      <h3>Registration Details:</h3>
      <ul>
        <li><strong>Registration ID:</strong> ${registration.registrationId}</li>
        <li><strong>Event:</strong> ${registration.eventTitle}</li>
        <li><strong>Team Name:</strong> ${registration.teamName || 'Individual'}</li>
        <li><strong>Paid Amount :</strong> ₹${registration.totalAmount || registration.amount || 'N/A'}</li>
        <li><strong>Transaction ID :</strong> ${registration.transactionId}</li>
      </ul>
      <p>If you believe this decision was made in error or need clarification, please reach out via our <a href="https://itechroots.in/contact-form">Contact Page</a>.</p>
    </div>
    <div class="footer">
      <p>This is an automated email — <strong>please do not reply</strong>.</p>
      <p>Thank you for your understanding.</p>
    </div>
  </div>
</body>
</html>
`;


// ==================== REVOKE EMAIL ====================
const revokeEmailTemplate = (registration) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Registration Status Updated - iTechroots 15.0</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 650px; margin: 40px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.12); }
    .header { background: linear-gradient(135deg, #e65100, #ff9800); color: white; padding: 25px; text-align: center; }
    .header h1 { margin: 0; font-size: 1.8em; }
    .event-subtitle { font-size: 0.9em; margin-top: 5px; opacity: 0.9; }
    .content { padding: 25px; color: #333; }
    .content h3 { color: #e65100; margin-top: 20px; }
    .content ul { padding-left: 20px; margin: 10px 0; }
    .footer { margin-top: 20px; padding: 15px; font-size: 0.85em; text-align: center; color: #666; background-color: #f2f2f2; }
    a { color: #e65100; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Registration Status Updated</h1>
      <p class="event-subtitle">iTechroots 15.0</p>
    </div>
    <div class="content">
      <p>Dear ${registration.teamName || registration.members[0].name},</p>
      <p>Your registration for <strong>iTechroots 15.0</strong> is now placed <strong>under review again</strong>.</p>
      <h3>Registration Details:</h3>
      <ul>
        <li><strong>Registration ID:</strong> ${registration.registrationId}</li>
        <li><strong>Event:</strong> ${registration.eventTitle}</li>
        <li><strong>Team Name:</strong> ${registration.teamName || 'Individual'}</li>
        <li><strong>Current Status:</strong> Pending Review</li>
      </ul>
      <p>Our team will review your registration again and notify you with the final decision shortly.</p>
    </div>
    <div class="footer">
      <p>Need help? Visit our <a href="https://itechroots.in/contact-form">Contact Page</a>.</p>
    </div>
  </div>
</body>
</html>
`;


const EventRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [emailSending, setEmailSending] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    event: 'all'
  });

  // Get unique event titles for filter dropdown
  const eventOptions = ['all', ...new Set(registrations.map(reg => reg.eventTitle))];
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'approved', label: 'Approved' },
    { id: 'rejected', label: 'Rejected' }
  ];

  useEffect(() => {
    const registrationsRef = ref(database, 'registrations');
    const registrationsQuery = query(registrationsRef, orderByChild('registrationDate'));

    const unsubscribe = onValue(registrationsQuery, (snapshot) => {
      if (snapshot.exists()) {
        const registrationsData = snapshot.val();
        const registrationsArray = Object.keys(registrationsData).map(key => ({
          id: key,
          ...registrationsData[key]
        }));
        setRegistrations(registrationsArray.reverse());
      } else {
        setRegistrations([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredRegistrations = (status) => {
    return registrations.filter(registration => {
      // Apply status filter if specified
      if (status !== 'all' && registration.status !== status) return false;

      // Apply event filter if specified
      if (filters.event !== 'all' && registration.eventTitle !== filters.event) return false;

      // Apply search term if specified
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          (registration.teamName?.toLowerCase().includes(searchLower) ||
            registration.transactionId?.toLowerCase().includes(searchLower) ||
            registration.eventTitle?.toLowerCase().includes(searchLower) ||
            registration.members.some(member =>
              member.name?.toLowerCase().includes(searchLower) ||
              member.email?.toLowerCase().includes(searchLower)
            ))
        );
      }
      return true;
    });
  };

  const sendEmailNotification = async (registration, status) => {
    try {
      setEmailSending(true);
      const email = registration.members[0].email;
      let subject, htmlContent;

      switch (status) {
        case 'approved':
          subject = `Your registration for ${registration.eventTitle} has been approved`;
          htmlContent = approvalEmailTemplate(registration);
          break;
        case 'rejected':
          subject = `Your registration for ${registration.eventTitle} could not be approved`;
          htmlContent = rejectionEmailTemplate(registration);
          break;
        default:
          throw new Error('Invalid status');
      }

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": REACT_APP_BREVO_API_KEY,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          sender: {
            name: "Event Management Team",
            email: "info@itechroots.in"
          },
          to: [{ email }],
          subject,
          htmlContent
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Brevo API Error Response:', errorData);
        throw new Error(`Failed to send email: ${response.status} - ${errorData}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Email sending failed:", error);
      throw error;
    } finally {
      setEmailSending(false);
    }
  };

  const updateStatus = async (id, newStatus, sendEmail = true) => {
    try {
      const registrationRef = ref(database, `registrations/${id}`);
      await update(registrationRef, { status: newStatus });

      if (sendEmail) {
        const registration = registrations.find(reg => reg.id === id);
        if (!registration) {
          alert('Registration not found!');
          return;
        }

        if (!registration.members?.[0]?.email) {
          alert('No email found for this registration!');
          return;
        }

        if (!REACT_APP_BREVO_API_KEY) {
          alert('Brevo API key is missing!');
          return;
        }

        await sendEmailNotification(registration, newStatus);
        alert(`Registration ${newStatus} and notification sent successfully!`);
      } else {
        alert(`Registration status updated to ${newStatus} successfully!`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to update status: ' + err.message);
    }
  };

  const escapeCsv = (value) => {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const formatTransactionId = (id) => {
    if (!id) return '';
    // Add spaces every 4 characters for better readability
    return id.replace(/(.{4})/g, '$1 ').trim();
  };

  const exportToCSV = () => {
    const headers = [
      'Registration ID',
      'Event Title',
      'Team Name',
      'Registration Type',
      'Transaction ID',
      'Status',
      'Registration Date',
      'Total Amount',
      'Members Count',
      'Member 1 Name',
      'Member 1 Email',
      'Member 1 Phone',
      'Member 1 College',
      'Member 1 Branch',
      'Member 1 Year',
      'Member 2 Name',
      'Member 2 Email',
      'Member 2 Phone',
      'Member 2 College',
      'Member 2 Branch',
      'Member 2 Year',
      'Member 3 Name',
      'Member 3 Email',
      'Member 3 Phone',
      'Member 3 College',
      'Member 3 Branch',
      'Member 3 Year',
      'Member 4 Name',
      'Member 4 Email',
      'Member 4 Phone',
      'Member 4 College',
      'Member 4 Branch',
      'Member 4 Year'
    ];

    // Apply current filters to exported data
    let dataToExport = filteredRegistrations(activeTab);

    const rows = dataToExport.map(reg => {
      const row = [
        escapeCsv(reg.registrationId),
        escapeCsv(reg.eventTitle),
        escapeCsv(reg.teamName),
        escapeCsv(reg.registrationType),
        escapeCsv(formatTransactionId(reg.transactionId)),
        escapeCsv(reg.status),
        escapeCsv(reg.registrationDate ? new Date(reg.registrationDate).toLocaleString() : ''),
        escapeCsv(reg.totalAmount || reg.amount || 'N/A'), // Use totalAmount first, fallback to amount
        reg.members ? reg.members.length : 0
      ];

      // Add member details (up to 4 members)
      for (let i = 0; i < 4; i++) {
        if (reg.members && reg.members[i]) {
          const member = reg.members[i];
          row.push(
            escapeCsv(member.name),
            escapeCsv(member.email),
            escapeCsv(member.phone),
            escapeCsv(member.college),
            escapeCsv(member.branch),
            escapeCsv(member.year)
          );
        } else {
          row.push('', '', '', '', '', '');
        }
      }

      return row.join(',');
    }).join('\n');

    const csvContent = `${headers.join(',')}\n${rows}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `event_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const MobileCard = ({ registration }) => {
    const statusColors = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
    };

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{registration.eventTitle}</h3>
            <p className="text-sm text-gray-600 truncate">{registration.teamName}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ml-2 ${statusColors[registration.status]}`}>
            {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <span className="text-gray-500">Type:</span>
            <span className="ml-1 font-medium capitalize">{registration.registrationType}</span>
          </div>
          <div>
            <span className="text-gray-500">Members:</span>
            <span className="ml-1 font-medium">{registration.members.length}</span>
          </div>
          <div>
            <span className="text-gray-500">Amount:</span>
            <span className="ml-1 font-medium">₹{registration.totalAmount || registration.amount || 'N/A'}</span>
          </div>
          <div>
            <span className="text-gray-500">Date:</span>
            <span className="ml-1 font-medium">{new Date(registration.registrationDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-3">
          <span className="text-xs text-gray-500">Transaction ID:</span>
          <p className="text-sm font-mono text-gray-800 break-all">{formatTransactionId(registration.transactionId)}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedEvent(registration)}
            className="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm font-medium"
          >
            <Eye size={14} />
            View
          </button>

          {registration.status === 'pending' && (
            <>
              <button
                onClick={() => updateStatus(registration.id, 'approved')}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium"
                disabled={emailSending}
              >
                {emailSending ? 'Sending...' : 'Approve'}
              </button>
              <button
                onClick={() => updateStatus(registration.id, 'rejected')}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium"
                disabled={emailSending}
              >
                {emailSending ? 'Sending...' : 'Reject'}
              </button>
            </>
          )}

          {(registration.status === 'approved' || registration.status === 'rejected') && (
            <button
              onClick={() => updateStatus(registration.id, 'pending', false)}
              className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm font-medium"
            >
              Revoke
            </button>
          )}
        </div>
      </div>
    );
  };

  const RegistrationTable = () => {
    const list = filteredRegistrations(activeTab);

    const statusColors = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
    };

    return (
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold border-b border-gray-200 pb-2">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Registrations ({list.length})
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <select
              value={filters.event}
              onChange={(e) => setFilters({ ...filters, event: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto min-w-[150px]"
            >
              <option value="all">All Events</option>
              {eventOptions
                .filter((e) => e !== 'all')
                .map((event) => (
                  <option key={event} value={event}>
                    {event}
                  </option>
                ))}
            </select>
          </div>

        </div>

        {list.length === 0 ? (
          <p className="text-gray-500 italic">No registrations found matching your criteria.</p>
        ) : (
          <>
            <div className="hidden lg:block overflow-x-auto rounded-lg shadow-sm border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Event', 'Team/Name', 'Type', 'Members', 'Amount', 'Transaction ID', 'Date', 'Status', 'Actions'].map((head) => (
                      <th
                        key={head}
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {list.map(registration => (
                    <tr key={registration.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium text-gray-900 max-w-xs truncate">
                        {registration.eventTitle}
                      </td>
                      <td className="px-4 py-4 text-gray-700 max-w-xs truncate">
                        {registration.teamName}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${registration.registrationType === 'team'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                          }`}>
                          {registration.registrationType}
                        </span>
                      </td>
                      <td className="px-4 py-4 flex items-center text-gray-600 space-x-1">
                        {registration.registrationType === 'team' ? (
                          <Users className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                        <span className="text-sm">{registration.members.length}</span>
                      </td>
                      <td className="px-4 py-4 text-gray-600 font-medium">
                        ₹{registration.totalAmount || registration.amount || 'N/A'}
                      </td>
                      <td className="px-4 py-4 text-gray-600 font-mono text-xs max-w-xs truncate">
                        {formatTransactionId(registration.transactionId)}
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-sm">
                        {new Date(registration.registrationDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[registration.status]}`}>
                          {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right space-x-2">
                        <div className="flex justify-end items-center space-x-2">
                          <button
                            onClick={() => setSelectedEvent(registration)}
                            className="text-indigo-600 hover:text-indigo-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1"
                          >
                            View
                          </button>
                          {registration.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateStatus(registration.id, 'approved')}
                                className="bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-green-500"
                                disabled={emailSending}
                              >
                                {emailSending ? 'Sending...' : 'Approve'}
                              </button>
                              <button
                                onClick={() => updateStatus(registration.id, 'rejected')}
                                className="bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-500"
                                disabled={emailSending}
                              >
                                {emailSending ? 'Sending...' : 'Reject'}
                              </button>
                            </>
                          )}
                          {(registration.status === 'approved' || registration.status === 'rejected') && (
                            <button
                              onClick={() => updateStatus(registration.id, 'pending', false)}
                              className="bg-orange-600 hover:bg-orange-700 text-white rounded px-2 py-1 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden space-y-4">
              {list.map(registration => (
                <MobileCard
                  key={registration.id}
                  registration={registration}
                />
              ))}
            </div>
          </>
        )}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Event Registrations</h1>
                <p className="text-gray-600 mt-1 text-sm">{registrations.length} total registrations</p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <button
                  onClick={exportToCSV}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <Download size={18} />
                  Export CSV
                </button>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="search"
                    placeholder="Search registrations..."
                    className="block w-full lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          {selectedEvent ? (
            <RegistrationDetails registration={selectedEvent} onBack={() => setSelectedEvent(null)} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm  p-6">
              {/* Tabs */}
              <div className="border-b border-gray-200 overflow-auto mb-6">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      {tab.label} ({filteredRegistrations(tab.id).length})
                    </button>
                  ))}
                </nav>
              </div>

              <RegistrationTable />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// RegistrationDetails component remains the same
const RegistrationDetails = ({ registration, onBack }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">Registration Details</h3>
            <p className="text-gray-600 text-sm mt-1">
              Registration ID: <span className="font-mono">{registration.registrationId}</span>
            </p>
          </div>
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-3 py-1"
          >
            ← Back to list
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Event Information</h4>
            <dl className="space-y-3 text-gray-700">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <dt className="font-medium">Event Title:</dt>
                <dd className="sm:text-right">{registration.eventTitle}</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <dt className="font-medium">Registration Type:</dt>
                <dd className="capitalize sm:text-right">{registration.registrationType}</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <dt className="font-medium">Registration Date:</dt>
                <dd className="sm:text-right">{new Date(registration.registrationDate).toLocaleString()}</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <dt className="font-medium">Total Amount:</dt>
                <dd className="font-semibold sm:text-right">₹{registration.totalAmount || registration.amount || 'N/A'}</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <dt className="font-medium">Status:</dt>
                <dd className={`font-semibold sm:text-right ${registration.status === 'approved'
                    ? 'text-green-600'
                    : registration.status === 'rejected'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}>
                  {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h4 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Payment Information</h4>
            <dl className="space-y-3 text-gray-700">
              <div>
                <dt className="font-medium mb-1">Transaction ID:</dt>
                <dd className="font-mono text-sm break-all bg-gray-50 p-2 rounded">
                  {registration.transactionId?.replace(/(.{4})/g, '$1 ').trim()}
                </dd>
              </div>
              {registration.paymentScreenshot && (
                <div className="mt-4">
                  <dt className="font-medium mb-2">Payment Screenshot:</dt>
                  <img
                    src={registration.paymentScreenshot}
                    alt="Payment proof"
                    className="max-w-full sm:max-w-xs rounded-md border border-gray-300 shadow-sm"
                  />
                </div>
              )}
            </dl>
          </div>
        </div>

        <div className="mt-8">
  <h4 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">
    {registration.registrationType === 'team'
      ? 'Team Information'
      : 'Participant Information'}
  </h4>

  <div className="space-y-4">
    {registration.members.map((member, index) => (
      <div
        key={index}
        className="border border-gray-200 rounded-lg p-4 sm:p-5"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <div>
            <h5 className="font-medium text-gray-900">
              {member.name}
              {index === 0 &&
                registration.registrationType === 'team' && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Team Leader
                  </span>
                )}
            </h5>
            <p className="text-sm text-gray-600 mt-1 break-all">
              {member.email}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-gray-700">{member.phone}</p>
            <p className="text-xs text-gray-500 mt-1">{member.college}</p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Branch:</span>
            <span className="ml-1 font-medium">{member.branch}</span>
          </div>
          <div>
            <span className="text-gray-500">Year:</span>
            <span className="ml-1 font-medium">{member.year}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default EventRegistrations;