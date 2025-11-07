"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@hive/ui';
import { secureApiFetch } from '@/lib/secure-auth-utils';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ToolDetailPage() {
  const params = useParams<{ toolId: string }>();
  const toolId = decodeURIComponent(params.toolId);
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { success, error: toastError, info } = useToast();
  const [qualityRunning, setQualityRunning] = useState(false);
  const [qualityStartAt, setQualityStartAt] = useState<number | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await secureApiFetch(`/api/admin/tools/detail/${encodeURIComponent(toolId)}`);
        if (!res.ok) throw new Error('Failed to load tool detail');
        const json = await res.json();
        setData(json);
      } catch (e: any) {
        setError(e?.message || 'Failed to load');
        toastError('Failed to load tool detail');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [toolId, toastError]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--hive-brand-primary)]" />
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="p-6 text-red-400 flex items-center gap-2"><AlertTriangle className="h-5 w-5"/> {error || data?.error}</div>
    );
  }

  const { tool, deployments, reviews, events } = data;

  const togglePublish = async () => {
    const newStatus = tool.status === 'published' ? 'hidden' : 'published';
    const res = await secureApiFetch('/api/admin/tools/catalog/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ toolId: tool.id, status: newStatus }) });
    if (res.ok) {
      success('Tool status updated', `${tool.name || tool.id} -> ${newStatus}`);
      setData((d: any) => ({ ...d, tool: { ...d.tool, status: newStatus } }));
    } else {
      toastError('Failed to update status');
    }
  };

  const runQuality = async () => {
    const res = await secureApiFetch('/api/admin/tools/quality/run', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ toolId: tool.id }) });
    if (res.ok) {
      info('Quality run requested');
      setQualityRunning(true);
      setQualityStartAt(Date.now());
    } else {
      toastError('Quality run failed');
    }
  };

  // Poll for quality run completion
  useEffect(() => {
    if (!qualityRunning || !qualityStartAt) return;
    const interval = setInterval(async () => {
      try {
        const res = await secureApiFetch(`/api/admin/tools/detail/${encodeURIComponent(toolId)}`);
        if (!res.ok) return;
        const json = await res.json();
        const events: any[] = json?.events || [];
        const completed = events.find((e: any) => e?.eventType === 'quality_run_completed' && Date.parse(e?.timestamp || '') > qualityStartAt);
        if (completed) {
          setQualityRunning(false);
          success('Quality run completed');
          setData(json);
        }
      } catch {}
    }, 4000);
    return () => clearInterval(interval);
  }, [qualityRunning, qualityStartAt, toolId, success]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{tool.name || tool.id}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={tool.status === 'published' ? 'default' : 'secondary'}>{tool.status}</Badge>
            {tool.currentVersion && <span className="text-white/60 text-sm">v{tool.currentVersion}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={togglePublish}>{tool.status === 'published' ? 'Hide' : 'Publish'}</Button>
          <Button onClick={runQuality} disabled={qualityRunning}>{qualityRunning ? 'Running…' : 'Run Quality'}</Button>
          <Link href="/admin/hivelab"><Button variant="outline">Back</Button></Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Deployments</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{deployments.length}</div>
            <p className="text-sm text-white/60">Last 50 records</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pending Reviews</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{reviews.filter((r: any) => r.status === 'pending').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Quality Events (30d)</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{events.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recent Deployments</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 text-white/70">
                <tr>
                  <th className="px-3 py-2 text-left">Target</th>
                  <th className="px-3 py-2 text-left">Surface</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Deployed</th>
                </tr>
              </thead>
              <tbody>
                {deployments.map((d: any) => (
                  <tr key={d.id} className="border-t border-white/10">
                    <td className="px-3 py-2">{d.deployedTo}:{d.targetId}</td>
                    <td className="px-3 py-2">{d.surface || '-'}</td>
                    <td className="px-3 py-2"><Badge variant={d.status === 'active' ? 'default' : 'secondary'}>{d.status}</Badge></td>
                    <td className="px-3 py-2 text-white/60">{typeof d.deployedAt === 'string' ? d.deployedAt.split('T')[0] : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Recent Quality & Errors</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 text-white/70">
                <tr>
                  <th className="px-3 py-2 text-left">Event</th>
                  <th className="px-3 py-2 text-left">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e: any, idx: number) => (
                  <tr key={idx} className="border-t border-white/10">
                    <td className="px-3 py-2">{e.eventType}</td>
                    <td className="px-3 py-2 text-white/60">{e.timestamp?.split?.('T')?.[0] || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
