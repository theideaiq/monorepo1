'use client';

import React from 'react';
import { TrendingUp, Users, ShoppingCart, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-brand-dark">Mission Control</h1>
        <p className="text-slate-500">Live overview of platform performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Total Revenue" value="2.4M IQD" icon={<TrendingUp className="text-green-500" />} />
        <StatsCard title="Active Rentals" value="12" icon={<ShoppingCart className="text-brand-yellow" />} />
        <StatsCard title="Registered Users" value="1,240" icon={<Users className="text-blue-500" />} />
        <StatsCard title="Low Stock Alerts" value="3 Items" icon={<AlertCircle className="text-red-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 h-64 flex items-center justify-center border-dashed border-2">
          <p className="text-slate-400">Sales Chart Coming Soon...</p>
        </Card>
        <Card className="p-6 h-64 flex items-center justify-center border-dashed border-2">
           <p className="text-slate-400">Recent Activity Log Coming Soon...</p>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon }: any) {
  return (
    <Card className="p-6 flex items-center gap-4">
      <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-brand-dark">{value}</h3>
      </div>
    </Card>
  );
}

                          className="h-8 px-3 text-xs"
                          variant="dark"
                        >
                          <Truck size={14} className="mr-1" /> Mark Delivered
                        </Button>
                      )}
                      {order.status === 'delivered' && (
                        <Button 
                          onClick={() => updateStatus(order.id, 'returned')}
                          className="h-8 px-3 text-xs"
                          variant="outline"
                        >
                          <CheckCircle size={14} className="mr-1" /> Confirm Return
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {rentals.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <Package size={48} className="mx-auto mb-4 opacity-50" />
              All quiet on the western front.
            </div>
          )}
        </Card>

        {/* Logout Modal */}
        <Modal 
          isOpen={showLogout} 
          onClose={() => setShowLogout(false)} 
          title="End Shift?"
        >
          <p className="text-slate-600 mb-6">Are you sure you want to log out of the command center?</p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setShowLogout(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleLogout}>Log Out</Button>
          </div>
        </Modal>

      </div>
    </div>
  );
}
