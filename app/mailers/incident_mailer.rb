class IncidentMailer < ApplicationMailer
  def incident_alert(incident)
    @incident = incident
    mail(to: @incident.assigned_to.email, subject: 'New Incident Assigned')
  end  
end
